const { ethers } = require("hardhat")

describe('Campaign', ()=>{
   let campaign
   let campaignAddress
   let factory
   const name = 'Fictive name lol'
   let deployer, user1, users

   beforeEach(async ()=>{
      [deployer, user1, ...users] = await ethers.getSigners()
      const Factory = await ethers.getContractFactory('CampaignFactory')
   })
})