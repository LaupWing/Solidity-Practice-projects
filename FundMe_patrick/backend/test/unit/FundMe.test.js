const {deployments, ethers, getNamedAccounts} = require("hardhat")
const {assert, expect} = require("chai")

describe("FundMe", async function(){
   let fundMe
   let deployer
   let mockV3Aggregator

   beforeEach(async ()=>{

      deployer = (await getNamedAccounts()).deployer
      await deployments.fixture(["all"])
      fundMe = await ethers.getContract("FundMe", deployer)
      mockV3Aggregator = await ethers.getContract(
         "MockV3Aggregator",
         deployer
      )
   })

   describe("constructor", async ()=>{
      it("sets the aggregator addresses correctly", async ()=>{
         const response = await fundMe.s_priceFeed()
         assert.equal(response, mockV3Aggregator.address)
      })
   })

   describe("fund", async ()=>{
      it("Fails if you don't send enough ETH", async ()=>{
         await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
      })
   })
})