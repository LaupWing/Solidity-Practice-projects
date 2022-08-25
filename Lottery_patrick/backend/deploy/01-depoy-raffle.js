const {network, ethers} = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

module.exports = async ({getNamedAccounts, deployments})=>{
   const {deploy , log} = deployments
   const {chainId} = network.config
   const {deployer} = await getNamedAccounts()
   let vrfCoordinatorV2Address

   if(developmentChains.includes(network.name)){
      const vrfCoordinatorV2Mock = await ethers.getContractAt("VRFCoordinatorV2Mock")
      vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
   }else {
      vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
   }

   const raffle = await deploy("Raffle", {
      from: deployer,
      args: [],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1
   })
}