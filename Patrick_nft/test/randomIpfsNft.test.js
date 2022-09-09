const { network, ethers, deployments } = require("hardhat")
const {assert, expect} = require("chai")
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

      describe("requestNft", ()=>{
         it("fails if payment isn't sent with the request", async ()=>{
            await expect(randomIpfsNft.requestNft()).to.be.reverted
         })

         it("reverts if payment amoutn is less than the mint fee", async ()=>{
            const fee = await randomIpfsNft.getMintFee()
            await expect(randomIpfsNft.requestNft({value: fee.sub(ethers.utils.parseEther("0.0001"))}))
               .to.be.reverted
         })
         
         it("emits an event and kicks off a random word request", async ()=>{
            const fee = await randomIpfsNft.getMintFee()
            await expect(randomIpfsNft.requestNft({value: fee.toString()}))
               .to.emit(randomIpfsNft, "NftRequested")
         })
      })

      describe("fulfillRandomWords", ()=>{
         it("mints NFT after random number is returned", async()=>{
            await new Promise(async (resolve,reject)=>{
               randomIpfsNft.once("NftMinted", async ()=>{
                  try{
                     const tokenUri = await randomIpfsNft.tokenURI("0")
                     const tokenCounter = await randomIpfsNft.getTokenCounter()
                     assert.equal(tokenUri.toString().includes("ipfs://"), true)
                     assert.equal(tokenCounter.toString(), "1")
                     resolve()
                  }catch(e){
                     reject(e)
                  }
               })
               try{
                  const fee = await randomIpfsNft.getMintFee()
                  const requestNftResponse = await randomIpfsNft.requestNft({
                     value: fee.toString()
                  })
                  const requestNftReceipt = await requestNftResponse.wait(1)
                  await vrfCoordinatorV2Mock.fulfillRandomWords(
                     requestNftReceipt.events[1].args.requestId,
                     randomIpfsNft.address
                  )
               }catch(e){
                  reject(e)
               }
            })
         })
      })

      describe("getBreedFromModdedRng", ()=>{
         it("should return pug if moddedRng < 10", async ()=>{
            const expectedValue = await randomIpfsNft.getBreedFromModdedRng(7)
            assert.equal(0, expectedValue)
         })
         it("should return shiba-inu if moddedRng 10 - 39", async ()=>{
            const expectedValue = await randomIpfsNft.getBreedFromModdedRng(21)
            assert.equal(1, expectedValue)
         })
         it("should return st. bernard if moddedRng 40 - 99", async ()=>{
            const expectedValue = await randomIpfsNft.getBreedFromModdedRng(77)
            assert.equal(2, expectedValue)
         })
         it("should revert if moddedRng > 99", async ()=>{
            await expect(randomIpfsNft.getBreedFromModdedRng(100)).to.be.reverted
         })
      })
   })