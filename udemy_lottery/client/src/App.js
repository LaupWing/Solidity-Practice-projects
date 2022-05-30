import { ethers } from 'ethers'
import { useState } from 'react'
import LotteryAbi from './contractsData/lottery.json'
import LotteryAddress from './contractsData/lottery-address.json'

function App() {
   const [loading, setLoading] = useState(false)
   const [account, setAccount] = useState(null)
   const [contract, setContract] = useState(null)

   const web3Handler = async ()=>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      setAccount(accounts[0])
      console.log(accounts)

      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })

      window.ethereum.on('accountsChanged', ()=>{
         setLoading(true)
         web3Handler()
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      loadContract(signer)
   }

   const loadContract = async (signer)=>{
      const contract = new ethers.Contract(LotteryAddress.address, LotteryAbi.abi, signer)
      // await contract.deployed()
      setContract(contract)
      setLoading(false)
      // setTimeout(()=>{
      //    test()
      // },1000)
   } 

   const test = async ()=>{
      console.log(contract)
      const minimum = await contract.minimum()
      console.log(Number(minimum.toString()))
   }
   return (
      <div>
         <h1>Lottery</h1>
         {account ? <p>{account}</p> :  <button onClick={web3Handler}>Conntect wallet</button> }
         <button onClick={test}>Test</button>
      </div>
   );
}

export default App;