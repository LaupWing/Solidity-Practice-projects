const {network, ethers} = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2")

module.exports = async ({getNamedAccounts, deployments})=>{
   const {deploy , log, get} = deployments
   const {chainId} = network.config
   const {deployer} = await getNamedAccounts()
   let vrfCoordinatorV2Address, subscriptionId

   if(developmentChains.includes(network.name)){
      vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
      vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
      const transationResponse = await vrfCoordinatorV2Mock.createSubscription()
      const transationReceipt = await transationResponse.wait(1)
      subscriptionId = transationReceipt.events[0].args[0].toNumber()
      await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)
   }else {
      vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
      subscriptionId = networkConfig[chainId]["subscriptionId"] 
   }
   
   const {
      raffleEntranceFee,
      gasLane,
      callbackGasLimit,
      interval
   } = networkConfig[chainId]
   
   const raffle = await deploy("Raffle", {
      from: deployer,
      args: [
         vrfCoordinatorV2Address, 
         raffleEntranceFee, 
         gasLane, 
         subscriptionId, 
         callbackGasLimit, 
         interval],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1
   })

   if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
      log("Verifying...")
      await verify(raffle.address, args)
   }
   log("-----------------------------------------")
}

module.exports.tags = ["all", "raffle"]