require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL

module.exports = {
   solidity: {
      compilers:[
         {
            version:"0.8.9",
         },
         {
            version:"0.6.0"
         }
      ]
   },
   networks:{
      rinkeby:{
         url: ''
      }
   },
   namedAccounts:{
      deployer:{
         default: 0,
         4: 1, // rinkeby
      }
   }
};
