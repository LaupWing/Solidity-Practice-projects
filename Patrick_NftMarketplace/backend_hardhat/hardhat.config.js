/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-contract-sizer")
require("dotenv").config()

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || process.env.ALCHEMY_MAINNET_RPC_URL || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

module.exports = {
   solidity: {
      compilers: [
         {
            version:"0.8.9"
         },
         {
            version:"0.6.6"
         },
         {
            version:"0.7.0"
         },
      ]
   },
   defaultNetwork: "hardhat",
   networks:{
      hardhat:{
         chainId: 31337
      },
      rinkeby:{
         url: RINKEBY_RPC_URL,
         accounts: [PRIVATE_KEY],
         chainId: 4,
         blockConfirmations: 6
      }
   },
   etherscan:{
      apiKey: ETHERSCAN_API_KEY
   },
   gasReporter:{
      enabled: true,
      currency: "USD",
      outputFile: "gas-report.txt",
      noColors: true,
      coinmarketcap: COINMARKETCAP_API_KEY
   },
   namedAccounts:{
      deployer:{
         default:0,
         1: 0
      }
   }
}