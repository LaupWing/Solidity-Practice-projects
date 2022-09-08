const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({getNamedAccounts, deployments}) =>{
   const {deploy, log} = deployments
   const {deployer} = await getNamedAccounts()

   log("---------------------")
   const args = []
   const basicNft = await deploy("BasicNft", {
      from: deployer,
      args,
      log: true,
      waintConfirmations: network.config.blockConfirmations || 1
   })

   if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
      log("Verifying...")
      await verify(basicNft.address, args)
      log("-------------------------------------")
   }
}

module.exports.tags =["all", "basicnft", "main"]