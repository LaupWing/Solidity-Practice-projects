const {ethers, network} = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")


module.exports = async ({getNamedAccounts})=>{
   const deployer = await getNamedAccounts()

   // Basci NFT
   const basicNft = await ethers.getContract("BasicNft", deployer)
   const basicMintTx = await basicNft.mintNft()
   await basicMintTx.wait(1)

   const randomIpfs = await ethers.getContract("RandomIpfsNft", deployer)
   const mintFee =await randomIpfs.getMintFee()

   await new Promise(async (resolve, reject)=>{
      setTimeout(resolve, 300000)
      randomIpfs.once("NftMinted", async ()=>{
         resolve()
      })
      const randomIpfsMintTx = await randomIpfs.requestNft({value: mintFee.toString()})
      const randomIpfsMintTxReceipt = await randomIpfsMintTx.wait(1)

      if(developmentChains.includes(network.name)){
         const requestId = randomIpfsMintTxReceipt.events[1].args.requestId.toString()
         const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
         await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, randomIpfs.address)
      }
   })
   console.log(`Random IPFS NFT index 0 tokenURI ${await randomIpfs.tokenURI()}`)

   const highValue = ethers.utils.parseEther("4000")
   const dynamicSvgNft = await ethers.getContract("DynamicSvgNft", deployer)
   const dynamicSvgNftMintTx = await dynamicSvgNft.mintNft(highValue.toString())
   await dynamicSvgNftMintTx.wait(1)
   console.log(`Dynamic SVG NFT index 0 tokenURI ${await dynamicSvgNft.tokenURI(0)}`)
}