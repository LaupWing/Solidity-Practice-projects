require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

module.exports = {
   solidity: {
      compilers: [
         { version: "0.8.8" },
         { version: "0.6.6" }
      ]
   },
   gasReporter: {
      enabled: true
   },
   namedAccounts: {
      deployer: {
         default: 0, // here this will by default take the first account as deployer
         1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
   },
};
