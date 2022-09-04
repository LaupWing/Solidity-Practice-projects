const { getNamedAccounts } = require("hardhat")

const getWeth = async () => {
   const { deployer } = await getNamedAccounts()

}

module.exports = {
   getWeth
}