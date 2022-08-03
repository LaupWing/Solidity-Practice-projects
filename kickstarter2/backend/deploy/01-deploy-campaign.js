module.exports = async({getNamedAccounts, deployments, network}) =>{
   const {deploy, log} = deployments
   const {deployer} = await getNamedAccounts()
   const chainId = network.config.chainId
}