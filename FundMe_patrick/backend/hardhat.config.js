require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

module.exports = {
   solidity: {
      compilers: [
         {
            version: "0.8.9",
         },
         {
            version: "0.6.0"
         }
      ]
   },
   networks: {
      rinkeby: {
         url: RINKEBY_RPC_URL,
         accounts: [PRIVATE_KEY],
         chainId: 4,
         blockConfirmations: 6
      }
   },
   etherscan: {
      apiKey: ETHERSCAN_API_KEY
   },
   gasReporter: {
      enabled: true,
      currency: "USD",
      outputFile: "gas-report.txt",
      noColors: true,
      coinmarketcap: COINMARKETCAP_API_KEY,
   },
   namedAccounts: {
      deployer: {
         default: 0,
         1: 0, // rinkeby
      }
   }
};
