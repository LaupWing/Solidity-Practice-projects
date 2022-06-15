const { ethers } = require("hardhat")
const { expect } = require("chai")

describe('Campaign', ()=>{
   let campaign
   let campaignAddress
   let factory
   const name = 'Fictive name lol'
   let deployer, user1, users
   
   beforeEach(async ()=>{
      [deployer, user1, ...users] = await ethers.getSigners()
      const Factory = await ethers.getContractFactory('CampaignFactory');
      factory = await Factory.deploy(name, 100);
      [campaignAddress] = await factory.getDeployedCampaigns()
      campaign = await ethers.getContractAt('Campaign', campaignAddress)
   })

   describe('deployment', async ()=>{
      it('Should track name and minimum contribution', async ()=>{
         expect(await campaign.minimum_contribution()).to.equal(100)
         expect(await campaign.name()).to.equal(name)
      })
   })
})