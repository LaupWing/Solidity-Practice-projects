const fs = require('fs')
const { artifacts, ethers } = require("hardhat")
const path = require('path')

async function main() {
   const CampaignFactory = await ethers.getContractFactory("CampaignFactory")
   const campaign = await CampaignFactory.deploy()
   const contractsDir = path.join(__dirname, '../../frontend/contractsData')
   await campaign.deployed()

   if(!fs.existsSync(contractsDir)){
      fs.mkdirSync(contractsDir)
   }

   fs.writeFileSync(
      `${contractsDir}/campaignFactory-address.json`,
      JSON.stringify({address: campaign.address}, undefined, 2)
   )
   
   const contractArtifact = artifacts.readArtifactSync('CampaignFactory')
      
   fs.writeFileSync(
      `${contractsDir}/campaignFactory.json`,
      JSON.stringify(contractArtifact, null, 2)
   )

   console.log("Greeter deployed to:", campaign.address)
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error)
      process.exit(1)
   })
