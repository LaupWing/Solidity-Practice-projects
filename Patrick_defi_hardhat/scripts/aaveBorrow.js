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
   const daiPrice = await getDaiPrice()
   const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1/ daiPrice.toNumber())
   console.log(`You can borrow ${amountDaiToBorrow} DAI`)
   const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())

   const daiTokenAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"

   await borrowDai(daiTokenAddress, lendingPool, amountDaiToBorrowWei, deployer)
   await getBorrowUserData(lendingPool, deployer)
   await repay(amountDaiToBorrowWei, daiTokenAddress, lendingPool, deployer)
   await getBorrowUserData(lendingPool, deployer)
}

const repay = async (amount, daiAddress, lendingPool, account)=>{
   await approveErc20(daiAddress, lendingPool.address, amount, account)
   const repayTx = await lendingPool.repay(daiAddress, amount, 1, account)
   await repayTx.wait(1)
   console.log("Repaid!")
}

const borrowDai = async (
   daiAddress, 
   lendingPool,
   amountDaiToBorrowWei,
   account
) =>{
   const borrowTx = await lendingPool.borrow(daiAddress, amountDaiToBorrowWei, 1, 0, account)
   await borrowTx.wait(1)
   console.log("You have borrowed!")
}

const getDaiPrice = async ()=>{
   const daiEthPriceFeed = await ethers.getContractAt(
      "AggregatorV3Interface",
      "0x773616E4d11A78F511299002da57A0a94577F1f4"
   )

   const price = (await daiEthPriceFeed.latestRoundData())[1]
   console.log(`DAI/ETH price is ${price.toString()}`)
   return price
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
   try{
      const {totalCollateralETH, totalDebtETH, availableBorrowsETH} = await lendingPool.getUserAccountData(account)
      console.log(`You have ${ethers.utils.formatUnits(totalCollateralETH, "ether")} worth of ETH deposited`)
      console.log(`You have ${ethers.utils.formatUnits(totalDebtETH, "ether")} worth of ETH borrowed`)
      console.log(`You can borrow ${ethers.utils.formatUnits(availableBorrowsETH, "ether")} worth of ETH`)
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