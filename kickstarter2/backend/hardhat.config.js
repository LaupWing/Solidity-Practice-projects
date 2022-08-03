require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter")
require("solidity-coverage")

module.exports = {
  solidity: "0.8.8",
  gasReporter: {
   enabled: true
  }
};
