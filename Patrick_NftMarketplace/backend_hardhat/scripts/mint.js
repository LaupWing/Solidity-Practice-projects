const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function mint(){
   const basicNFt = await ethers.getContract("BasicNft")
   console.log("Minting...")
   const mintTx = await basicNFt.mintNft()
   const mintTxReceipt = await mintTx.wait(1)
   const tokenId = mintTxReceipt.events[0].args.tokenId
   console.log(`Got TokenID: ${tokenId}!!`)
   console.log(`NFT address: ${basicNFt.address}!!`)

   if(network.config.chainId == "31337"){
      await moveBlocks(2, 1000)
   }
}

mint()
   .then(()=> process.exit(0))
   .catch(err=>{
      console.error(err)
      process.exit(1)
   })