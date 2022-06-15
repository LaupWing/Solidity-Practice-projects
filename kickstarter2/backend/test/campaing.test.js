const { ethers } = require("hardhat")
const { expect } = require("chai")

describe('Campaign', ()=>{
   let campaign
   let campaignAddress
   let factory
   const name = 'Fictive name lol'
   let deployer, user1, users
   const minimum_contribution = 100

   beforeEach(async ()=>{
      [deployer, user1, ...users] = await ethers.getSigners()
      const Factory = await ethers.getContractFactory('CampaignFactory');
      factory = await Factory.deploy(name, minimum_contribution);
      [campaignAddress] = await factory.getDeployedCampaigns()
      campaign = await ethers.getContractAt('Campaign', campaignAddress)
   })

   describe('Deployment', async ()=>{
      it('Should track name and minimum contribution', async ()=>{
         expect(await campaign.minimum_contribution()).to.equal(minimum_contribution)
         expect(await campaign.name()).to.equal(name)
      })
      it('Marks caller as the campaign manager', async ()=>{
         expect(await campaign.manager()).to.equal(deployer.address)
      })
   })

   describe('Contribution', async ()=>{
      it('Should successfully register new account with the correct contribution', async ()=>{
         await campaign.connect(user1).contribute({value: 200})
         expect((await campaign.approversCount()).toString()).to.equal('1')
      })
      it('Should revert with message when send incorrect contribution', async()=>{
         await expect(campaign.connect(user1).contribute({value:5})).to.be.revertedWith('Minimum contribution not met')
      })
   })

   describe('Request', async ()=>{
      it('Should successfully create a new request', async ()=>{
         await campaign.connect(deployer).createRequest('Test', 'Testing description', 100, user1.address)
         console.log((await campaign.requests(0)).title)
      })
   })
})