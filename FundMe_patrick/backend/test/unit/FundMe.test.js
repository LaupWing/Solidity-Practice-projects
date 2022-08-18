const {deployments, ethers, getNamedAccounts} = require("hardhat")
const {assert, expect} = require("chai")

describe("FundMe", async function(){
   let fundMe
   let deployer
   let mockV3Aggregator
   const sendValue = ethers.utils.parseEther("1")

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

      it("updated amount funded data structure", async ()=>{
         await fundMe.fund({value: sendValue})
         const response = await fundMe.s_addressToAmountFunded(
            deployer
            )
            assert.equal(response.toString(), sendValue.toString())
      })

      it("Adds funder to array of funders", async ()=>{
         await fundMe.fund({value: sendValue})
         const funder = await fundMe.s_funders(0)
         assert.equal(funder, deployer)
      })
   })
})