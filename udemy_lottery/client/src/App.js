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
      <div 
         style={{
            backgroundImage: 'url(https://browsecat.net/sites/default/files/the-lottery-wallpapers-87160-475911-9479287.png)'
         }}
         className='flex flex-col items-start p-10 w-screen h-screen bg-cover'
      >
         <h1>Lottery</h1>
         {account ? <p>{account}</p> :  <button className='btn' onClick={web3Handler}>Connect wallet</button> }
         {contract ? <Enter account={account} contract={contract}/> : ''}
      </div>
   );
}

export default App;
