const hre = require("hardhat")

async function main() {
   const CampaignFactory = await hre.ethers.getContractFactory("Greeter")
   const campaign = await Greeter.deploy()

   await campaign.deployed()

   console.log("Greeter deployed to:", greeter.address)
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error)
      process.exit(1)
   })
