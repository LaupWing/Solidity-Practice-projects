const { getNamedAccounts, ethers } = require("hardhat")
const { getWeth } = require("./getWeth")

const main = async ()=>{
   await getWeth()
   const {deployer} = await getNamedAccounts()
   const lendingPool = await getLendingPool(deployer)
   console.log(`LendingPool address ${lendingPool.address}`)
}

const getLendingPool = async (account)=>{
   const lendingPoolAddressProvider = await ethers.getContractAt(
      "ILendingPoolAddressesProvider", 
      "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5", 
      account
   )

   const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
   const lendingPool = await ethers.getContractAt(
      "ILendingPool",
      lendingPoolAddress,
      account
   )
   return lendingPool
}

main()
   .then(()=> process.exit(1))
   .catch(err =>{
      console.error(err)
      process.exit(1)
   })