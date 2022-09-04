const { ethers, network } = require("hardhat")

const mockVrf = async (requestId, raffle) =>{
   const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
   await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, raffle.address)
   const recentWinner = await raffle.getRecentWinner()
   console.log(`The winner is ${recentWinner}`)
}

const mockKeepers = async ()=>{
   const raffle = await ethers.getContract("Raffle")
   const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
   const {upkeepNeeded} = await raffle.callStatic.checkUpkeep(checkData)

   if(upkeepNeeded){
      const tx = await raffle.performUpkeep(checkData)
      const txReceipt = await tx.wait(1)
      const requestId = txReceipt.events[1].args.requestId

      if(network.config.chainId === 31337){
         await mockVrf(requestId, raffle) 
      }
   }else{
      console.log("No upkeep needed!")
   }
}

mockKeepers()
   .then(()=> process.exit(0))
   .catch(err=>{
      console.log(err)
      process.exit(1)
   })