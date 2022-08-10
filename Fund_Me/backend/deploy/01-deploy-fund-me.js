module.exports = async ({getNamedAccounts, deployments})=>{
   const {deploy, logs} = deployments
   const {deployer} = await getNamedAccounts()
   
}