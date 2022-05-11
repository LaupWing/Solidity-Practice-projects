const { expect } = require("chai")
const { ethers } = require("hardhat")

describe('Campaign', ()=>{
   let campaign

   beforeEach(async()=>{
      const CampaignFactory = await ethers.getContractFactory('Campaign')
      campaign = await CampaignFactory.deploy(100)
   })
   it('Should log out name', async()=>{
      const Campaign = await ethers.getContractFactory('Campaign')
      const campaign = await Campaign.deploy(100)
      // const minimum_contribution = 

      expect(await campaign.minimum_contribution()).to.equal(100)
      console.log(await campaign.manager())
   })
   describe('Deployment', async ()=>{
      it('Should track name', async function(){
         const name = 'Decentratwitter'

         expect(await campaign.name()).to.equal(name)
      })
   })
})