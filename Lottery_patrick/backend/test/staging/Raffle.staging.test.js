const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const {developmentChains, networkConfig} = require("../../helper-hardhat-config")
const {assert, expect} = require("chai")

developmentChains.includes(network.name) ? 
   describe.skip : 
   describe("Raffle Unit Tests", async ()=>{
      let raffle, raffleEntranceFee, deployer

      beforeEach(async ()=>{
         deployer = (await getNamedAccounts()).deployer
         raffle = await ethers.getContract("Raffle", deployer)
         raffleEntranceFee = await raffle.getEntranceFee()
      })

      describe("fulfillRandomWords", ()=>{
         it("works with live Chainlink keepers and Chainlink VRF, we get a random winner", async ()=>{
            const startingTimestamp = await raffle.getLatestTimeStamp()
            const accounts = await ethers.getSigners()
            
            await new Promise(async (resolve, reject)=>{
               raffle.once("WinnerPicked", async ()=>{
                  console.log("WinnerPicked event fired")
                  try{
                     const recentWinner = await raffle.getRecentWinner()
                     const raffleState = await raffle.getRaffleState()
                     const winnerEndingBalance = await accounts[0].getBalance()
                     const endingTimestamp = await raffle.getLatestTimeStamp()

                     await expect(raffle.getPlayer(0)).to.be.reverted
                     assert.equal(recentWinner.toString(), accounts[0].address)
                     assert.equal(raffleState, 0)
                     assert.equal(winnerEndingBalance.toString(), winnerStartingBalance.add(raffleEntranceFee.toString()))
                     assert(endingTimestamp > startingTimestamp)
                     resolve()
                  }catch(err){
                     console.log(err)
                     reject(err.message)
                  }
               })
            })

            // Then entering raffle
            await raffle.enterRaffle({ value: raffleEntranceFee})
            const winnerStartingBalance = await accounts[0].getBalance()
            
         })
      })
   })