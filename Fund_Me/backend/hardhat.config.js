require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
/** @type import('hardhat/config').HardhatUserConfig */
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

   },
   namedAccounts:{
      deployer:{
         default: 0,
         4: 1, // rinkeby
      }
   }
};
