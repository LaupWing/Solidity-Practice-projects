import { ethers } from 'ethers'
import { useState } from 'react'
import LotteryAbi from './contractsData/lottery.json'
import LotteryAddress from './contractsData/lottery-address.json'
import Enter from './Enter'

function App() {
   const [loading, setLoading] = useState(false)
   const [account, setAccount] = useState(null)
   const [contract, setContract] = useState(null)

   const web3Handler = async ()=>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      setAccount(accounts[0])

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
      setContract(contract)
      setLoading(false)
   } 

   return (
      <div className='w-screen h-screen bg-blend-multiply bg-cover flex items-center flex-col justify-center'>
         <div
            className='flex flex-col items-start p-10 bg-yellow-100 rounded'
         >
            <h1>Lottery</h1>
            {account ? <p>{account}</p> :  <button className='btn' onClick={web3Handler}>Connect wallet</button> }
            {contract ? <Enter account={account} contract={contract}/> : ''}
         </div>
      </div>
   );
}

export default App;
