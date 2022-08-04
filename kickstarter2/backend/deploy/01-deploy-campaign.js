const { networkConfig } = require("../helper-hardhat-config")

module.exports = async({getNamedAccounts, deployments, network}) =>{
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