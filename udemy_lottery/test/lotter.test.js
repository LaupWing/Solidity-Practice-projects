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
         console.log(deployer.address)
         console.log(await lottery.manager())
      })
   })
})
