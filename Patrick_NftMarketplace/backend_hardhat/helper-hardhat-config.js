const networkConfig = {
   31337: {
      name: "localhost",
      ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
      gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
      mintFee: "10000000000000000",
      callbackGasLimit: "500000"
   },
   4: {
      name: "rinkeby",
      ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
      vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
      gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
      callbackGasLimit: "500000",
      mintFee: "10000000000000000",
      subscriptionId: "1002"
   }
}

const DECIMALS = "18"
const INITIAL_PRICE = "200000000000000000000"
const developmentChains = ["hardhat", "localhost"]

module.exports = {
   networkConfig,
   developmentChains,
   DECIMALS,
   INITIAL_PRICE
}