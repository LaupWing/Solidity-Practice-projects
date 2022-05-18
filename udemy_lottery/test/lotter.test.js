const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
   let lottery
   let deployer, user1, user2, users
   const minimum = '200'

   beforeEach(async ()=>{
      [deployer, user1, user2, ...users] = await ethers.getSigners();
      const LotteryFactory = await ethers.getContractFactory('Lottery')
      lottery = await LotteryFactory.deploy(minimum)
   })

   describe('Deployment', async ()=>{
      it('Should register minimum contribution', async ()=>{
         expect((await lottery.minimum()).toString()).to.equal(minimum)
      })
      it('Manager should be the same as the deployer', async ()=>{
         expect(await lottery.manager()).to.equal(deployer.address)
      })
      describe('enter', async()=>{
         it('Should succesfully enter user1', async ()=>{
            await lottery.connect(user1).enter({value: '300'});
            const [_entee1] = await lottery.getPlayers()
            expect(_entee1).to.equal(user1.address)
         })
      })
   })
})
