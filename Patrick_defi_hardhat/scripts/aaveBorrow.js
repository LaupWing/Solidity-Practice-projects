const { getNamedAccounts, ethers } = require("hardhat")
const { getWeth } = require("./getWeth")

const main = async ()=>{
   await getWeth()
   const {deployer} = await getNamedAccounts()

   const lendingPool = await getLendingPool(deployer)
   console.log(`LendingPool address ${lendingPool.address}`)

   const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
   
}

const approveErc20 = async (contractAddress, spenderAddress, amountToSpend, account)=>{
   const erc20Token = await ethers.getContractAt("")
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