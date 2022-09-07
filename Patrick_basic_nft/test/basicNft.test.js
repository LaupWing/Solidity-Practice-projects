const { network, ethers, deployments } = require("hardhat")
const {assert} = require("chai")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
   ? describe.skip
   : describe("Basic NFT Unit Tests", ()=>{
      let basicNft, deployer

      beforeEach(async()=>{
         const accounts = await ethers.getSigners() 
         deployer = accounts[0]
         await deployments.fixture(["basicnft"])
         basicNft = await ethers.getContract("BasicNft")
      })

      describe("Constructor", ()=>{
         it("Initializes the NFT correctly", async ()=>{
            const name = await basicNft.name()
            const symbol = await basicNft.symbol()
            const tokenCounter = await basicNft.getTokenCounter()

            assert(name, "Dogie")
            assert(symbol, "DOG")
            assert(tokenCounter.toString(), "0")
         })
      })

      describe("Mint NFT", ()=>{
         it("Allows users to mint an NFT, and updates appropriately", async ()=>{
            const txResponse = await basicNft.mintNft()
            await txResponse.wait(1)
            const tokenURI = await basicNft.tokenURI(0)
            const tokenCounter = await basicNft.getTokenCounter()

            assert(tokenCounter.toString(), "1")
            assert(tokenURI, await basicNft.TOKEN_URI())
         })
      })
   })