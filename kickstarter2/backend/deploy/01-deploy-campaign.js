const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const {network} = require("hardhat")

module.exports = async({getNamedAccounts, deployments}) =>{
   const {deploy, log, get} = deployments
   const {deployer} = await getNamedAccounts()
   const chainId = network.config.chainId
   console.log(networkConfig)
   let ethUsdPriceFeedAddress

   if(developmentChains.includes(network.name)){
      const ethUsdAggregator = await get("MockV3Aggregator")
      ethUsdPriceFeedAddress = ethUsdAggregator.address
   }else{
      ethUsdPriceFeedAddress = await networkConfig[chainId]["ethUsdPriceFeed"]
   }

   const campaign = await deploy("CampaignFactory", {
      from: deployer,
      args: [ethUsdPriceFeedAddress]
   })
}