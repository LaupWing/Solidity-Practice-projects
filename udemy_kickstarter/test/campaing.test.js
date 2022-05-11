const { expect } = require("chai")
const { ethers } = require("hardhat")

describe('Campaign', ()=>{
   let campaign
   const name = 'Fictive game lol'

   beforeEach(async()=>{
      const CampaignFactory = await ethers.getContractFactory('Campaign')
      campaign = await CampaignFactory.deploy(name, 100)
   })

   describe('Deployment', async ()=>{
      it('Should track name and minimum contribution', async function(){
         
         expect(await campaign.minimum_contribution()).to.equal(100)
         expect(await campaign.name()).to.equal(name)
      })
   })
})