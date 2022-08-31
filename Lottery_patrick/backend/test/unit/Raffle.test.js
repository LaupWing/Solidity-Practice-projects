const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const {developmentChains} = require("../../helper-hardhat-config")

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
            
         })
      })
   })