const { expect } = require("chai")
const { ethers } = require("hardhat")

describe('Campaign', ()=>{
   let campaign
   const name = 'Fictive game lol'
   let deployer, user1, user2, users

   beforeEach(async()=>{
      const CampaignFactory = await ethers.getContractFactory('Campaign');
      [deployer, user1, user2, ...users] = await ethers.getSigners();
      campaign = await CampaignFactory.deploy(name, 100)
      console.log(ethers.utils.formatEther(await (await deployer.getBalance()).toString()))
   })

   describe('Deployment', async ()=>{
      it('Should track name and minimum contribution', async function(){
         
         expect(await campaign.minimum_contribution()).to.equal(100)
         expect(await campaign.name()).to.equal(name)
      })
   })

   describe('Contribution', async ()=>{
      it('Should successfully register new account with the correct contribution', async ()=>{
         await campaign.connect(user1).contribute({value:200})
         console.log((await campaign.approversCount()).toString())
      })
      it('Should unsuccessfully register new account with the incorrect contribution', async ()=>{
         await expect(campaign.connect(user1).contribute({value:5})).to.be.revertedWith('Minimum contribution not met')
      })
   })
})