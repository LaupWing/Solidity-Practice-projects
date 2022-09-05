const { getNamedAccounts } = require("hardhat")
const { getWeth } = require("./getWeth")

const main = async ()=>{
   await getWeth()
   const {deployer} = await getNamedAccounts()

}

const getLendingPool = async ()=>{
   
}

main()
   .then(()=> process.exit(1))
   .catch(err =>{
      console.error(err)
      process.exit(1)
   })