const { ethers } = require("hardhat")
const { expect } = require("chai")

describe('Campaign', ()=>{
   let campaign
   let campaignAddress
   let factory
   const name = 'Fictive name lol'
   let deployer, user1, users
   const minimum_contribution = 100
   const goal =  1000000000000000
   const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit dapibus diam, eu mollis magna molestie in. Pellentesque efficitur viverra augue, eu fermentum ante accumsan id. Mauris lacus est, interdum varius mi id, congue aliquam lectus.'
   const thumbnail = 'some_image_url'
   let request_1 = {}
   
   beforeEach(async ()=>{
      [deployer, user1, ...users] = await ethers.getSigners();
      
      const Factory = await ethers.getContractFactory('CampaignFactory');
      factory = await Factory.deploy();
      await factory.createCampaign(
         name, 
         minimum_contribution,
         goal,
         description,
         thumbnail
      );

      [campaignAddress] = await factory.getDeployedCampaigns()
      campaign = await ethers.getContractAt('Campaign', campaignAddress)
      request_1 = {
         title: 'Request 1',
         description: 'Describing Request1',
         value: 100,
         recipient: user1.address
      }
   })

   describe('Deployment', async ()=>{
      it('Should track name and minimum contribution', async ()=>{
         expect(await campaign.i_minimum_contribution()).to.equal(minimum_contribution)
         expect(await campaign.name()).to.equal(name)
      })
      it('Marks caller as the campaign manager', async ()=>{
         expect(await campaign.i_manager()).to.equal(deployer.address)
      })
   })

   describe('Contribution', async ()=>{
      it('Should successfully register new account with the correct contribution', async ()=>{
         await campaign.connect(user1).contribute({value: 200})
         expect((await campaign.approversCount()).toString()).to.equal('1')
         expect(await campaign.approvers(user1.address)).to.be.true
      })
      it('Should revert with message when send incorrect contribution', async()=>{
         await expect(campaign.connect(user1).contribute({value:5})).to.be.revertedWith('Minimum contribution not met')
      })
   })

   describe('Request', async ()=>{
      it('Should successfully create a new request', async ()=>{
         await campaign.connect(deployer).createRequest(
            request_1.title, 
            request_1.description, 
            request_1.value, 
            request_1.recipient
         )
         
         expect((await campaign.requests(0)).title).to.be.equal(request_1.title)
         expect((await campaign.requests(0)).description).to.be.equal(request_1.description)
         expect((await campaign.requests(0)).value).to.be.equal(request_1.value)
         expect((await campaign.requests(0)).recipient).to.be.equal(request_1.recipient)
      })
      
      it('Should unsuccessfully create a new request', async ()=>{
         await expect(campaign.connect(user1).createRequest(
            request_1.title, 
            request_1.description, 
            request_1.value, 
            request_1.recipient
         )).to.be.revertedWith('Only manager allowed')
      })
   })
      
   // describe('End to end', async ()=>{
      
   //    it('Request can be approved', async()=>{
   //       await campaign.connect(deployer).createRequest(
   //          request_1.title, 
   //          request_1.description, 
   //          request_1.value, 
   //          request_1.recipient
   //       )
   //       await campaign.connect(user1).contribute({value: 200})
   //       await campaign.connect(users[0]).contribute({value: 200})
   //       await campaign.connect(users[1]).contribute({value: 200})
   //       await campaign.connect(user1).approveRequest(0)
   //       await campaign.connect(users[0]).approveRequest(0)
         
   //       await campaign.connect(deployer).finalizeRequest(0)
   //       expect(true)
   //    })
   //    it('Request can be denied', async()=>{
   //       await campaign.connect(deployer).createRequest(
   //          request_1.title, 
   //          request_1.description, 
   //          request_1.value, 
   //          request_1.recipient
   //       )
   //       await campaign.connect(user1).contribute({value: 200})
   //       await campaign.connect(users[0]).contribute({value: 200})
   //       await campaign.connect(users[1]).contribute({value: 200})
   //       await campaign.connect(user1).denyRequest(0)
   //       await campaign.connect(users[0]).denyRequest(0)
         
   //       await campaign.connect(deployer).finalizeRequest(0)
   //       expect(true)
   //    })
   //    it('Request can NOT be approved', async()=>{
   //       await campaign.connect(deployer).createRequest(
   //          request_1.title, 
   //          request_1.description, 
   //          request_1.value, 
   //          request_1.recipient
   //       )
   //       await campaign.connect(user1).contribute({value: 200})
   //       await campaign.connect(users[0]).contribute({value: 200})
   //       await campaign.connect(users[1]).contribute({value: 200})
   //       await campaign.connect(user1).approveRequest(0)
         
   //       await expect(campaign.connect(deployer).finalizeRequest(0)).to.be.revertedWith('Not enough people have approved this request')
   //    })
   // })
})