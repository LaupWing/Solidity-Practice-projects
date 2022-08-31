const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const {developmentChains} = require("../../helper-hardhat-config")
const {assert} = require("chai")

!developmentChains.includes(network.name) ? 
   describe.skip : 
   describe("Raffle Unit Tests", async ()=>{
      let raffle, vrfCoordinatorV2Mock

      beforeEach(async ()=>{
         const {deployer} = await getNamedAccounts()
         await deployments.fixture(["all"])
         raffle = await ethers.getContract("Raffle", deployer)
         vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
      })

      describe("constructor", async ()=>{
         it("initialize the raffle correclty", async ()=>{
            const raffleState = await raffle.getRaffleState()
            const interval = await raffle.getInterval()
            
            assert.equal(raffleState.toString(), "0")
         })
      })
   })