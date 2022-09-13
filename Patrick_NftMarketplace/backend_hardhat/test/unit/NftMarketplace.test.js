const {assert, expect} = require("chai")
const {network, deployments, ethers, getNamedAccounts} = require("hardhat")
const {developmentChains} = require("../../helper-hardhat-config")

!developmentChains.includes(network.name) ? describe.skip : describe("Nft Marketpalce Tests", ()=>{
   let nftMarketplace, basicNft, deployer
   const PRICE = ethers.utils.parseEther("0.1")
   const TOKEN_ID = 0

   beforeEach(async()=>{
      const accounts = await ethers.getSigners()
      deployer = accounts[0]
      player = accounts[1]
      await deployments.fixture(["all"])
      nftMarketplaceContract = await ethers.getContract("NftMarketplace")
      nftMarketplace = nftMarketplaceContract.connect(deployer)
      basicNft = await ethers.getContract("BasicNft")
      await basicNft.mintNft()
      await basicNft.approve(nftMarketplace.address, TOKEN_ID)
   })

   describe("listItem", ()=>{
      it("emits an event after listing an item", async ()=>{
         expect(await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE).to.emit("ItemListed"))
      })

      it("exclusively items that haven't been listed", async ()=>{
         await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
         const error = `AlreadyListed("${basicNft.address}", ${TOKEN_ID})`

         await expect(
            nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
         ).to.be.revertedWith(error)
      })

      it("needs approvals to list item", async ()=>{
         await basicNft.approve(ethers.constants.AddressZero, TOKEN_ID)
         await expect(
            nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
         ).to.be.revertedWith("NotApprovedForMarketplace")
      })

      it("Updates listing with seller and price", async ()=>{
         await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
         const listing = await nftMarketplace.getListing(basicNft.address, TOKEN_ID)
         assert(listing.price.toString() == PRICE.toString())
         assert(listing.seler.toString() == deployer.address)
      })
   })
   it("lists and can be bought", async ()=>{
      await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
      const playerConnectedNftMarketplace = nftMarketplace.connect(player)
      await playerConnectedNftMarketplace.buyItem(basicNft.address, TOKEN_ID, {value: PRICE})
      const newOwner = await basicNft.ownerOf(TOKEN_ID)
      const deployerProceeds = await nftMarketplace.getProceeds(deployer)

      assert(newOwner.toString() == player.address)
      assert(deployerProceeds.toString() ==  PRICE.toString())
   })
   
})