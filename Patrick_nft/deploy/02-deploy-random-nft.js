const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")
const { verify } = require("../utils/verify")

const imageLocation = "./images"

const metadataTemplate = {
   name: "",
   description: "",
   image: "",
   attributes :[
      {
         trait_type: "Cuteness",
         value: 100
      }
   ]
}

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
      const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
      vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
      const tx = await vrfCoordinatorV2Mock.createSubscription()
      const txReceipt = await tx.wait(1)
      subscribtionId = txReceipt.events[0].args.subId
      
   }else{
      vrfCoordinatorV2Address =  networkConfig[chainId].vrfCoordinatorV2
      subscribtionId =  networkConfig[chainId].subscribtionId
   }
   log("--------------------")
   const args = [
      vrfCoordinatorV2Address, 
      subscribtionId,
      networkConfig[chainId].gasLane,
      networkConfig[chainId].callbackGasLimit,
      tokenUris,
      networkConfig[chainId].mintFee,
   ]

   const randomIpfsNft = await deploy("RandomIpfsNft", {
      from: deployer,
      args,
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1
   })
   log("--------------------------------")
   if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
      log("Verifying...")
      await verify(randomIpfsNft.address, args)
      log("-------------------------------------")
   }
}

async function handleTokenUris(){
   const tokenUris =[]
   const {responses, files} = await storeImages(imageLocation)
   for(responseIndex in responses){
      let tokenUriMetadata = {...metadataTemplate}
      tokenUriMetadata.name = files[responseIndex].replace(".png", "")
      tokenUriMetadata.description = `An adorable ${tokenUriMetadata.meta}`
      tokenUriMetadata.image = `ipfs://${responses[responseIndex].IpfsHash}`
      console.log(`Uploading ${tokenUriMetadata.name}...`)
      const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
      console.log(`Succesfully uploaded ${tokenUriMetadata.name}`)
      tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
   }
   console.log("Token uris are ::::")
   console.log(tokenUris)
   console.log("Token Uri's uploaded")
   return tokenUris
}


module.exports.tags = ["all", "randomipfs", "main"]