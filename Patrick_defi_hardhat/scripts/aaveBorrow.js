const { getNamedAccounts, ethers } = require("hardhat")
const { getWeth, AMOUNT } = require("./getWeth")

const main = async ()=>{
   await getWeth()
   const {deployer} = await getNamedAccounts()

   const lendingPool = await getLendingPool(deployer)
   console.log(`LendingPool address ${lendingPool.address}`)

   const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
   await approveErc20(
      wethTokenAddress,
      lendingPool.address,
      AMOUNT,
      deployer
   )
   console.log("Depositing...")
   await lendingPool.deposit(
      wethTokenAddress,
      AMOUNT,
      deployer,
      0
   )
   console.log("Deposited!")
   let {availableBorrowsETH, totalDebtETH} = await getBorrowUserData(lendingPool, deployer)
}

const approveErc20 = async (
   erc20Address, 
   spenderAddress, 
   amountToSpend, 
   account
)=>{
   const erc20Token = await ethers.getContractAt(
      "IERC20",
      erc20Address,
      account
   )

   const tx = await erc20Token.approve(spenderAddress, amountToSpend)
   await tx.wait(1)
   console.log("Approved")
}

const getBorrowUserData =  async (lendingPool, account)=>{
   console.log("heh")
   try{
      const {totalCollateralETH, totalDebtETH, availableBorrowsETH} = await lendingPool.getUserAccountData(account)
      console.log(`You have ${totalCollateralETH} worth of ETH deposited`)
      console.log(`You have ${totalDebtETH} worth of ETH borrowed`)
      console.log(`You can borrow ${availableBorrowsETH} worth of ETH`)
      return {availableBorrowsETH, totalDebtETH}
   }catch(e){
      console.log(e)
   }
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