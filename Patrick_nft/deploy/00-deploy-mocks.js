const { network } = require("hardhat")
const { DECIMALS, INITIAL_PRICE } = require("../helper-hardhat-config")

const BASE_FEE = "250000000000000000"
const GAS_PRICE_LINK = 1e9

module.exports = async ({getNamedAccounts, deployments}) =>{
   const {deploy, log} = deployments
   const {deployer} = await getNamedAccounts()
   const chainId = network.config.chainId

   if(chainId == 31337){
      log("Local network detected! Deploying mocks...")
      await deploy("VRFCoordinatorV2Mock", {
         from: deployer,
         log: true,
         args: [BASE_FEE, GAS_PRICE_LINK]
      })
      await deploy("MockV3Aggregator", {
         from: deployer,
         log: true,
         args: [DECIMALS, INITIAL_PRICE]
      })

      log("Mocks deployed!!!")
      log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      log("You are deploying to local network, you'll need alcoal network running to interact")
      log("!!!!!!!!!!!!")
   }
}

module.exports.tags = ["all", "mocks", "main"]