const networkConfig = {
   4: {
      name: "rinkeby",
      ethUsdPriceFeed: "0x0"
   }
}

const developmentChains = ["hardhat", "localhost"]

const DECIMALS = 8
const INITIAL_ANSWER = 20000000000

module.exports = {
   networkConfig,
   developmentChains,
   DECIMALS,
   INITIAL_ANSWER
}