const fs = require('fs')
const path = require('path')
const { ethers, artifacts } = require('hardhat')

async function main(){
   const [deployer, user1] = await ethers.getSigners()

   const LotteryFactory = await ethers.getContractFactory('Lottery')
   const lottery = await LotteryFactory.deploy('200')

   const contractsDir = path.join(__dirname,'../app/contractsData')

   if(!fs.existsSync(contractsDir)){
      fs.mkdirSync(contractsDir)
   }

   fs.writeFileSync(
      contractsDir + `/lottery-address.json`,
      JSON.stringify({address: lottery.address}, undefined, 2)
   )
      
   const contractArtifact = artifacts.readArtifactSync('Lottery')
   
   fs.writeFileSync(
      contractsDir + '/lottery.json',
      JSON.stringify(contractArtifact, undefined, 2)
   )
   console.log('Lottery contract deployed to:', lottery.address)
}

main()
   .then(()=>process.exit(0))
   .catch(error =>{
      console.log(error)
      process.exit(1)
   })