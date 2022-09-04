/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")

const MAINNET_RPC_URL =  process.env.MAINNET_RPC_URL || process.env.ALCHEMY_MAINNET_RPC_URL || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
   solidity: "0.8.9",
};
