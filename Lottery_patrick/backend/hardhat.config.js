require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: "0.8.9",
   namedAccounts :{
      deployer:{
         default: 0
      },
      player:{
         default: 1
      },
   }
}
