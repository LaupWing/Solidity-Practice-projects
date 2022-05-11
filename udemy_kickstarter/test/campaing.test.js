const { expect } = require("chai")
const { ethers } = require("hardhat")

describe('Campaign', ()=>{
   it('Should log out name', async()=>{
      const Campaign = await ethers.getContractFactory('Campaign')
      const campaign = await Campaign.deploy(100)
      // const minimum_contribution = 

      expect(await campaign.minimum_contribution()).to.equal(100)
      console.log(await campaign.manager())
   })
})