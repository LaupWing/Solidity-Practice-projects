const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const {developmentChains, networkConfig} = require("../../helper-hardhat-config")
const {assert, expect} = require("chai")

!developmentChains.includes(network.name) ? 
   describe.skip : 
   describe("Raffle Unit Tests", async ()=>{
      let raffle, raffleEntranceFee, deployer, interval

      beforeEach(async ()=>{
         deployer = (await getNamedAccounts()).deployer
         await deployments.fixture(["all"])
         raffle = await ethers.getContract("Raffle", deployer)
         vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
         raffleEntranceFee = await raffle.getEntranceFee()
         interval = await raffle.getInterval()
      })
   })