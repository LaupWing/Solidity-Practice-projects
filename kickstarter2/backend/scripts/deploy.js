const fs = require('fs')
const { artifacts, ethers } = require("hardhat")

async function main() {
   const CampaignFactory = await ethers.getContractFactory("Campaign")
   const campaign = await CampaignFactory.deploy()
   const contractsDir = __dirname + '../../frontend/contractsData'
   await campaign.deployed()

   if(!fs.existsSync(contractsDir)){
      fs.mkdirSync(contractsDir)
   }

   fs.writeFileSync(
      `${contractsDir}/campaign-address.json`,
      JSON.stringify({address: campaign.address}, undefined, 2)
      )
      
      const contractArtifact = artifacts.readArtifactSync('Campaign')
      
   fs.writeFileSync(
      `${contractsDir}/campaign.json`,
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
