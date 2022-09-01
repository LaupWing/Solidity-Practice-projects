const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const {developmentChains, networkConfig} = require("../../helper-hardhat-config")
const {assert, expect} = require("chai")

!developmentChains.includes(network.name) ? 
   describe.skip : 
   describe("Raffle Unit Tests", async ()=>{
      let raffle, vrfCoordinatorV2Mock, raffleEntranceFee, deployer, interval
      const chainId = network.config.chainId

      beforeEach(async ()=>{
         deployer = (await getNamedAccounts()).deployer
         await deployments.fixture(["all"])
         raffle = await ethers.getContract("Raffle", deployer)
         vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
         raffleEntranceFee = await raffle.getEntranceFee()
         interval = await raffle.getInterval()
      })

      describe("constructor", ()=>{
         it("initialize the raffle correctly", async ()=>{
            const raffleState = await raffle.getRaffleState()
            const interval = await raffle.getInterval()

            assert.equal(raffleState.toString(), "0")
            assert.equal(interval.toString(), networkConfig[chainId]["interval"])
         })
      })

      describe("enterRaffle", ()=>{
         it("reverts when you don't pay enough", async ()=>{
            await expect(raffle.enterRaffle()).to.be.revertedWithCustomError(
               raffle,
               `Raffle__NotEnoughETHEntered`
            )
         })
         it("records player when they enter", async ()=>{
            await raffle.enterRaffle({value: raffleEntranceFee})
            const playerFromContract = await raffle.getPlayer(0)
            assert.equal(playerFromContract, deployer)
         })
         it("emits event on enter", async ()=>{
            await expect(raffle.enterRaffle({value: raffleEntranceFee})).to.emit(raffle, "RaffleEnter")
         })
         it("doesnt allow entrance when raffle is calculating", async ()=>{
            await raffle.enterRaffle({value: raffleEntranceFee})
            await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
            await network.provider.send("evm_mine", [])
            await raffle.performUpkeep([])
            await expect(raffle.enterRaffle({value: raffleEntranceFee})).revertedWithCustomError(
               raffle,
               `Raffle__NotOpen`
            )
         })
      })
   })