const { getWeth } = require("./getWeth")

const main = async ()=>{
   await getWeth()
}

main()
   .then(()=> process.exit(1))
   .catch(err =>{
      console.error(err)
      process.exit(1)
   })