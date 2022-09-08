const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { storeImages } = require("../utils/uploadToPinata")
const { verify } = require("../utils/verify")


module.exports = async ({getNamedAccounts, deployments}) =>{
   const {deploy, log} = deployments
   const {deployer} = await getNamedAccounts()
   const chainId = network.config.chainId

   let vrfCoordinatorV2Address, subscribtionId
   let tokenUris

   if(process.env.UPLOAD_TO_PINATA === "true"){
      tokenUris = await handleTokenUris()
   }

   if(developmentChains.includes(network.name)){
      // const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
      // vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
      // const tx = await vrfCoordinatorV2Mock.createSubscription()
      // const txReceipt = await tx.wait(1)
      // subscribtionId = txReceipt.events[0].args.subId
      
   }else{
      vrfCoordinatorV2Address =  networkConfig[chainId].vrfCoordinatorV2
      subscribtionId =  networkConfig[chainId].subscribtionId
   }
   log("--------------------")
   // const args = [
   //    vrfCoordinatorV2Address, 
   //    subscribtionId,
   //    networkConfig[chainId].gasLane,
   //    networkConfig[chainId].callbackGasLimit,
   //    // tokenUri
   //    networkConfig[chainId].mintFee,
   // ]
   await storeImages("../images")
}

async function handleTokenUris(){
   tokenUris =[]

   return tokenUris
}

module.exports.tags = ["all", "randomipfs", "main"]