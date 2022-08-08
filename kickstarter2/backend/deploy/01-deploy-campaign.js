const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const {network, artifacts} = require("hardhat")
const fs = require('fs')
const path = require('path')
const contractsDir = path.join(__dirname, '../../frontend/contractsData')

module.exports = async({getNamedAccounts, deployments}) =>{
   const {deploy, get} = deployments
   const {deployer} = await getNamedAccounts()
   const chainId = network.config.chainId
   
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

   if(!fs.existsSync(contractsDir)){
      fs.mkdirSync(contractsDir)
   }

   fs.writeFileSync(
      `${contractsDir}/campaignFactory-address.json`,
      JSON.stringify({address: campaign.address}, undefined, 2)
   )
   
   const contractFactoryArtifact = artifacts.readArtifactSync('CampaignFactory')
   const contractArtifact = artifacts.readArtifactSync('Campaign')
      
   fs.writeFileSync(
      `${contractsDir}/campaignFactory.json`,
      JSON.stringify(contractFactoryArtifact, null, 2)
   )
   fs.writeFileSync(
      `${contractsDir}/campaign.json`,
      JSON.stringify(contractArtifact, null, 2)
   )
}