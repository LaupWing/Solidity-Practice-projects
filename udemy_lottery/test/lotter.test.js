const { expect } = require("chai");
const { utils } = require("ethers");
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
   })
   describe('enter', async()=>{
      it('Should succesfully enter user1', async ()=>{
         await lottery.connect(user1).enter({value: '300'});
         const [_entee1] = await lottery.getPlayers()
         expect(_entee1).to.equal(user1.address)
      })
      it('Should unsuccesfully enter user1 and be reverted', async ()=>{
         await expect(lottery.connect(user1).enter({value: '100'}))
         .to
         .be
         .revertedWith('Doesnt met the enter fee')
      })
      it('Should succesfully added two users and confirm it', async ()=>{
         await lottery.connect(user1).enter({value: '300'});
         await lottery.connect(user2).enter({value: '300'});
         const [_entee1, _entee2] = await lottery.getPlayers()
         
         expect(_entee1).to.equal(user1.address)
         expect(_entee2).to.equal(user2.address)
      })
   })
   describe('Picking a winner', async ()=>{
      it('Manager can start lottery', async ()=>{
         await lottery.connect(user1).enter({value: '300'});
         const [_entee1] = await lottery.getPlayers()
         
         await lottery.connect(deployer).pickWinner()
      })

      it('Non-manager cant start lottery', async ()=>{
         await lottery.connect(user1).enter({value: '300'});
         await expect(lottery.connect(user1).pickWinner())
            .to
            .be
            .revertedWith('Only manager can do this')
      })

   })

   describe('End to end test', async()=>{
      it('sends money to the winner and resets players array', async ()=>{
         await lottery.connect(user1).enter({value: utils.parseEther('2').toString()})
         
         const initialBalance = (await user1.getBalance()).toString()
         await lottery.connect(deployer).pickWinner()
         const finalBalance = (await user1.getBalance()).toString()
         expect(Number(utils.formatEther((finalBalance - initialBalance).toString())))
            .to
            .above(1.8)
      })
   })
})
