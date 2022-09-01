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
   })