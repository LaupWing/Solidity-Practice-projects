const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONTEND_ADDRESSES_FILE = "../frontend/constants/contractAddresses.json"
const FRONTEND_ABI_FILE = "../frontend/constants/abi.json"

module.exports = async () =>{
   if(process.env.UPDATE_FRONTEND){
      updateContractAddresses()
   }
}

async function updateContractAddresses(){
   const raffle = await ethers.getContract("Raffle")
   const chainId = network.config.chainId.toString()
   const currentAddresses = JSON.parse(fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf-8"))

   if(chainId in currentAddresses){
      if(!currentAddresses[chainId].includes(raffle.address)){
         currentAddresses[chainId].push(raffle.address)
      }
   }else{
      currentAddresses[chainId] = [raffle.address]
   }
   fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

module.exports.tags =["all", "frontend"]
