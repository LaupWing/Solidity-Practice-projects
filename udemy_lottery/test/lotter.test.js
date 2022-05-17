const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
   let lottery
   let deployer, user1, user2, users

   beforeEach(async ()=>{
      [deployer, user1, user2, ...users] = ethers.getSigners()
      const LotteryFactory = await ethers.getContractFactory('Lottery')
      lottery = LotteryFactory.deploy(200)
   })
})
