const {network, ethers} = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2")

module.exports = async ({getNamedAccounts, deployments})=>{
   const {deploy , log} = deployments
   const {chainId} = network.config
   const {deployer} = await getNamedAccounts()
   let vrfCoordinatorV2Address, subscribionId

   if(developmentChains.includes(network.name)){
      const vrfCoordinatorV2Mock = await ethers.getContractAt("VRFCoordinatorV2Mock")
      vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
      const transationResponse = await vrfCoordinatorV2Mock.createSubscription()
      const transationReceipt = await transationResponse.wait(1)
      subscribionId = transationReceipt.events[0].args.subId

      await vrfCoordinatorV2Mock.fundSubscription(subscribionId, VRF_SUB_FUND_AMOUNT)
   }else {
      vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
   }
   
   const {
      raffleEntranceFee,
      gasLane
   } = networkConfig[chainId]

   const raffle = await deploy("Raffle", {
      from: deployer,
      args: [vrfCoordinatorV2Address, raffleEntranceFee, gasLane],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1
   })
}