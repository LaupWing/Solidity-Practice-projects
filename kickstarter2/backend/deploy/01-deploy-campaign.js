const { networkConfig } = require("../helper-hardhat-config")
const {network} = require("hardhat")

module.exports = async({getNamedAccounts, deployments}) =>{
   const {deploy, log} = deployments
   const {deployer} = await getNamedAccounts()
   const chainId = network.config.chainId
   console.log(networkConfig)

   const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
   if(true){

   }else{

   }

   const campaign = await deploy("CampaignFactory", {
      from: deployer,
      args: []
   })
}