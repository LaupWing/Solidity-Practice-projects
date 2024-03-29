const Moralis = require("moralis-v1/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")

const chainId = process.env.chainId || 31337
const moralisChainId = chainId == "31337" ? "1337" : chainId
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER
const masterKey = process.env.masterKey

async function main() {
   await Moralis.start({ serverUrl, appId, masterKey })
   console.log(`Working with contractaddress ${contractAddress}`)

   const itemListedOptions = {
      chainId: moralisChainId,
      address: contractAddress,
      sync_historical: true,
      topic: "ItemListed(address,address,uint256,uint256)",
      abi: {
         "anonymous": false,
         "inputs": [
            {
               "indexed": true,
               "internalType": "address",
               "name": "seller",
               "type": "address"
            },
            {
               "indexed": true,
               "internalType": "address",
               "name": "nftAddress",
               "type": "address"
            },
            {
               "indexed": true,
               "internalType": "uint256",
               "name": "tokenId",
               "type": "uint256"
            },
            {
               "indexed": false,
               "internalType": "uint256",
               "name": "price",
               "type": "uint256"
            }
         ],
         "name": "ItemListed",
         "type": "event"
      },
      tableName: "ItemListed"
   }

   let itemBoughtOptions = {
      chainId: moralisChainId,
      address: contractAddress,
      sync_historical: true,
      topic: "ItemBought(address,address,uint256,uint256)",
      abi: {

         "anonymous": false,
         "inputs": [
            {
               "indexed": true,
               "internalType": "address",
               "name": "buyer",
               "type": "address"
            },
            {
               "indexed": true,
               "internalType": "address",
               "name": "nftAddress",
               "type": "address"
            },
            {
               "indexed": true,
               "internalType": "uint256",
               "name": "tokenId",
               "type": "uint256"
            },
            {
               "indexed": false,
               "internalType": "uint256",
               "name": "price",
               "type": "uint256"
            }
         ],
         "name": "ItemBought",
         "type": "event"
      },
      tableName: "ItemBought"
   }

   let itemCanceledOptions = {
      chainId: moralisChainId,
      address: contractAddress,
      sync_historical: true,
      topic: "ItemCanceled(address,address,uint256)",
      abi: {
         "anonymous": false,
         "inputs": [
            {
               "indexed": true,
               "internalType": "address",
               "name": "seller",
               "type": "address"
            },
            {
               "indexed": true,
               "internalType": "address",
               "name": "nftAddress",
               "type": "address"
            },
            {
               "indexed": true,
               "internalType": "uint256",
               "name": "tokenId",
               "type": "uint256"
            }
         ],
         "name": "ItemCanceled",
         "type": "event"
      },
      tableName: "ItemCanceled"
   }

   const listedResponse = await Moralis.Cloud.run("watchContractEvent", itemListedOptions, {
      useMasterKey: true
   })
   const boughtResponse = await Moralis.Cloud.run("watchContractEvent", itemBoughtOptions, {
      useMasterKey: true
   })
   const canceledResponse = await Moralis.Cloud.run("watchContractEvent", itemCanceledOptions, {
      useMasterKey: true
   })
   console.log(listedResponse)

   if(listedResponse.success && canceledResponse.success && boughtResponse.success){
      console.log("Success! Database updated with watching events")
   }else {
      console.log("Something went wrong")
   }
}

main()
   .then(() => process.exit(0))
   .catch(err => {
      console.error(err)
      process.exit(1)
   })