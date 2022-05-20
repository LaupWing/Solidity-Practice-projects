const fs = require('fs')
const { ethers, artifacts } = require('hardhat')

async function main(){
   const [deployer, user1] = await ethers.getSigners()

   const LotteryFactory = await ethers.getContractFactory('Lottery')
   const lottery = await LotteryFactory.deploy(deployer)

   const contractsDir = __dirname + '../app/contractsData'

   if(!fs.existsSync(contractsDir)){
      fs.mkdir(contractsDir)
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