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

      describe("checkUpkeep", ()=>{
         it("returns false if people haven't send any any ETH", async ()=>{
            await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
            await network.provider.send("evm_mine", [])
            const {upkeepNeeded} = await raffle.callStatic.checkUpkeep([])
            assert(!upkeepNeeded)
         })
         
         it("returns false if raffle isn't open", async ()=>{
            await raffle.enterRaffle({value: raffleEntranceFee})
            await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
            await network.provider.send("evm_mine", [])
            await raffle.performUpkeep("0x") // 0x is the same as []
            const raffleState = await raffle.getRaffleState()
            const {upkeepNeeded} = await raffle.callStatic.checkUpkeep([])
            assert.equal(raffleState.toString(), "1")
            assert.equal(upkeepNeeded, false)
         })

         it("returns false if enough time hasn't passed", async () => {
            await raffle.enterRaffle({value: raffleEntranceFee})
            await network.provider.send("evm_increaseTime", [interval.toNumber()  + 1])
            const {upkeepNeeded} = await raffle.callStatic.checkUpkeep([])
            assert(!upkeepNeeded)
         })

         it("returns true if enough time has passed, has players, eth, and is open", async ()=>{
            await raffle.enterRaffle({value: raffleEntranceFee})
            await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
            await network.provider.request({method: "evm_mine", params: []})
            const {upkeepNeeded} = await raffle.callStatic.checkUpkeep("0x")
            assert(upkeepNeeded)
         })
      })

      describe("performUpkeep", ()=>{
         it("it can only run if checkupkeep is true", async ()=>{
            await raffle.enterRaffle({value: raffleEntranceFee})
            await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
            await network.provider.send("evm_mine", [])
            const tx = await raffle.performUpkeep([])
            assert(tx)
         })
         it("reverts when checkupkeep is false", async ()=>{
            await expect(raffle.performUpkeep([])).revertedWithCustomError(
               raffle,
               `Raffle__UpkeepNotNeeded`
            )
         })
         it("updates the raffle state, emits and event, and calls the vrf coordinator" ,async ()=>{
            await raffle.enterRaffle({value: raffleEntranceFee})
            await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
            await network.provider.send("evm_mine", [])
            const txResponse = await raffle.performUpkeep([])
            const txReceipt = await txResponse.wait(1)
            const requestId = txReceipt.events[1].args.requestId
            const raffleState = await raffle.getRaffleState()

            assert(requestId.toNumber() > 0)
            assert(raffleState.toString() == "1")
         })
      })

      describe("fulfillRandomwords", ()=>{
         beforeEach(async ()=>{
            await raffle.enterRaffle({value: raffleEntranceFee})
            await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
            await network.provider.send("evm_mine", [])
         })
         it("can only be called after performUpkeep", async ()=>{
            await expect(vrfCoordinatorV2Mock.fulfillRandomWords(0, raffle.address))
               .to
               .be
               .revertedWith("nonexistent request")
            await expect(vrfCoordinatorV2Mock.fulfillRandomWords(1, raffle.address))
               .to
               .be
               .revertedWith("nonexistent request")
         })

         it("picks a winner, resets the lottery, and sends money", async ()=>{
            const additionalEntrants = 3
            const startingAccountIndex = 1 // because deployer is 0
            const accounts = await ethers.getSigners()

            for(let i = startingAccountIndex; i < startingAccountIndex + additionalEntrants; i++){
               const accountConnectedRaffle = raffle.connect(accounts[i])
               await accountConnectedRaffle.enterRaffle({value: raffleEntranceFee})
            }

            const startingTimestamp = await raffle.getLatestTimestamp()
            
            await new Promise(async (resolve, reject) =>{
               raffle.once("WinnerPicked", async ()=>{
                  try{
                     const recentWinner = await raffle.getRecenetWinner()
                     const raffleState = await raffle.getRaffleState()
                     const endingTimeStamp = await raffle.getLatestTimeStamp()
                     const numPlayers = await raffle.getNumberOfPlayers()
                     const winnerEndingBalance = await accounts[1].getBalance()

                     assert.equal(numPlayers.toString(), "0")
                     assert.equal(raffleState.toString(), "0")
                     assert(endingTimeStamp > startingTimestamp)

                     assert.equal(
                        winnerEndingBalance.toString(),
                        winnerStartingBalance.add(
                           raffleEntranceFee
                              .mul(additionalEntrants)
                              .add(raffleEntranceFee)
                              .toString()
                        )
                     )
                  }catch(e){
                     reject()
                  }
                  resolve()
               })

               const tx = await raffle.performUpkeep([])
               const txReceipt = await tx.wait(1)
               const winnerStartingBalance = await accounts[1].getBalance()
               await vrfCoordinatorV2Mock.fulfillRandomWords(
                  txReceipt.events[1].args.requestId, 
                  raffle.address
               )
            })
         })
      })
   })