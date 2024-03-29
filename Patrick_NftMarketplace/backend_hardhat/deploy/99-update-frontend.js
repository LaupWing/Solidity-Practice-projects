const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontEndContractsFile = "../nextjs-nft-marketplace/constants/networkMapping.json"
const frontEndAbiLocation = "../nextjs-nft-marketplace/constants/"

module.exports = async ()=>{
   if(process.env.UPDATE_FRONTEND){
      await updateContractAddresses()
      await updateAbi()
   }
}

async function updateAbi(){
   const nftMarketplace = await ethers.getContract("NftMarketplace")
   fs.writeFileSync(`${frontEndAbiLocation}NftMarketplace.json`, 
      nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
   )

   const basicNft = await ethers.getContract("BasicNft")
   fs.writeFileSync(`${frontEndAbiLocation}BasicNft.json`, basicNft.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses(){
   try{
      const chainId = network.config.chainId.toString()
      const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf-8"))
      const nftMarketplace = await ethers.getContract("NftMarketplace")

      if(chainId in contractAddresses){
         if(!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.address)){
            contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address)
         }
      }
      else{
         contractAddresses[chainId] = {
            NftMarketplace: [nftMarketplace.address]
         }
      }
      fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
   }catch(e){
      console.log(e)
   }
}


module.exports.tags = ["all", "frontend"]