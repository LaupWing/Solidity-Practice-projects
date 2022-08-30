const { network, getNamedAccounts, deployments } = require("hardhat")
const {developmentChains} = require("../../helper-hardhat-config")

!developmentChains.includes(network.name) ? 
   describe.skip : 
   describe("Raffle Unit Tests", async ()=>{
      let raffle, vrfCoordinatorV2Mock

      beforeEach(async ()=>{
         const {deployer} = await getNamedAccounts()
         await deployments.fixture(["all"])
      })
   })