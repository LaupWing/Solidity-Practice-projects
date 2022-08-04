require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

module.exports = {
   solidity: {
      compilers :[
         {version:"0.8.8"},
         {version:"0.6.6"}
      ]
   },
   gasReporter: {
      enabled: true
   }
};
