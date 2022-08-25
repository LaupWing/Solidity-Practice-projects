require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   defaultNetwork: "hardhat",
   networks:{
      hardhat:{
         chainId: 31337,
         blockConfirmations: 1
      },
      rinkeby:{
         chainId: 4,
         blockConfirmations: 6,
         url: RINKEBY_RPC_URL,
         accounts: []
      },
   },
   solidity: "0.8.9",
   namedAccounts :{
      deployer:{
         default: 0
      },
      player:{
         default: 1
      },
   }
}
