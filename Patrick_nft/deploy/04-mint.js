const {ethers, network} = require("hardhat")


module.exports = async ({getNamedAccounts})=>{
   const deployer = await getNamedAccounts()

   // Basci NFT
   const basicNft = await ethers.getContract("BasicNft", deployer)
   const basicMintTx = await basicNft.mintNft()
   await basicMintTx.wait(1)

   const randomIpfs = await ethers.getContract("RandomIpfsNft", deployer)
   const mintFee =await randomIpfs.getMintFee()
   const randomIpfsMint = await randomIpfs.requestNft({value: mintFee.toString()})

   
}