const { network, ethers, deployments } = require("hardhat")
const {assert} = require("chai")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
   ? describe.skip
   : describe("Basic NFT Unit Tests", ()=>{
      let randomIpfsNft, deployer, vrfCoordinatorV2Mock

      beforeEach(async()=>{
         const accounts = await ethers.getSigners() 
         deployer = accounts[0]
         await deployments.fixture(["mocks", "randomipfs"])
         randomIpfsNft = await ethers.getContract("RandomIpfsNFt")
         vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
      })

      describe("Constructor", ()=>{
         it("sets starting values correctly", async ()=>{
            const dogTokenUriZero = await randomIpfsNft.getDogTokenUris(0)
            const isInitialized = await randomIpfsNft.getInitialized()
            assert(dogTokenUriZero.includes("ipfs://"))
            assert.equal(isInitialized, true)
         })
      })

      describe("Mint NFT", ()=>{
         
      })
   })