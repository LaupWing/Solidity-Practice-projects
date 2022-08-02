require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter")
require("solidity-coverage")

module.exports = {
  solidity: "0.8.4",
  gasReporter: {
   enabled: true
  }
};
