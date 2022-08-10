require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: "0.8.9",
   networks:{

   },
   namedAccounts:{
      deployer:{
         default: 0,
         4: 1, // rinkeby
      }
   }
};
