/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || process.env.ALCHEMY_MAINNET_RPC_URL || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
   solidity: {
      compilers: [
         {
            version: "0.8.9"
         },
         {
            version: "0.6.12"
         },
         {
            version: "0.4.19"
         },
      ]
   },
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {
         chainId: 31337,
         forking: {
            url: MAINNET_RPC_URL
         }
      },
      localhost: {
         chainId: 31337
      },
      kovan: {
         url: KOVAN_RPC_URL,
         accounts: [PRIVATE_KEY],
         chainId: 42,
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
      noColors: true
   },
   namedAccounts: {
      deployer: {
         default: 0,
         1: 0
      }
   }
};
