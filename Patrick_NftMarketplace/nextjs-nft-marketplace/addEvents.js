const Moralis = require("moralis/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")

const chainId = process.env.chainId || 31337
const moralisChainId = chainId == "31337" ? "1337" : chainId
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

const appId = process.env.NEXT_PUBLIC_APP_ID
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const masterKey = process.env.masterKey

async function main(){
   await Moralis.start({serverUrl, appId, masterKey})
   console.log(`Working with contractaddress ${contractAddress}`)

   const itemListedOptions = {
      chainId: moralisChainId,
      sync_historical: true,
      topic: "ItemListed(address,address,uint256,uint256)" 
   }
}

main()
   .then(()=> process.exit(0))
   .catch(err=>{
      console.error(err)
      process.exit(1)
   })