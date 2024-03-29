const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList(){
   const nftMarketplace = await ethers.getContract("NftMarketplace")
   const basicNFt = await ethers.getContract("BasicNft")
   console.log("Minting...")
   const mintTx = await basicNFt.mintNft()
   const mintTxReceipt = await mintTx.wait(1)
   const tokenId = mintTxReceipt.events[0].args.tokenId
   console.log("Approving Nft...")
   const approvalTx = await basicNFt.approve(nftMarketplace.address, tokenId)
   await approvalTx.wait(1)
   console.log("Listing NFT...")
   const tx = await nftMarketplace.listItem(basicNFt.address, tokenId, PRICE)
   await tx.wait(1)
   console.log("Listed!")

   if(network.config.chainId == "31337"){
      await moveBlocks(2, 1000)
   }
}

mintAndList()
   .then(()=> process.exit(0))
   .catch(err=>{
      console.error(err)
      process.exit(1)
   })