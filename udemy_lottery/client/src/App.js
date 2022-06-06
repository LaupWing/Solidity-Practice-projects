import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import LotteryAbi from './contractsData/lottery.json'
import LotteryAddress from './contractsData/lottery-address.json'
import ReactLoading from 'react-loading'
import Enter from './Enter'
import Header from './Header'
import Entees from './Entees'

function App() {
   const [loading, setLoading] = useState(false)
   const [account, setAccount] = useState(null)
   const [contract, setContract] = useState(null)
   const [winner, setWinner] = useState(null)
   const [submission, setSubmission] = useState(0)

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

   const fetchSubmission = async ()=>{
      const entered = await contract.enteesFees(account)
      if(entered.toString() !== '0'){
         setSubmission(entered.toString())
      }else{
         setSubmission(0)
      }
      const winner = await contract.haveIWon()
      console.log(winner)
      setLoading(false)
   }
   useEffect(()=>{
      if(contract){
         setLoading(true)
         fetchSubmission()
      }
   },[contract])

   const loadContract = async (signer)=>{
      const contract = new ethers.Contract(LotteryAddress.address, LotteryAbi.abi, signer)
      setContract(contract)
      contract.on('WinnerIs', async (address)=>{
         const isWinner = await contract.haveIWon()
         console.log(address)
         console.log(isWinner)
      })
   } 

   return (
      <div className='w-screen h-screen bg-blend-multiply bg-cover flex items-center flex-col'>
         <Header account={account}/>
         <div className='flex flex-1 flex-col items-center justify-center'>
            <div
               className='flex flex-col items-start p-4 bg-yellow-300 rounded'
            >
               {account ? 
                  loading ? 
                     <ReactLoading type='spokes'/> : 
                        submission ? 
                           <Entees contract={contract} account={account}/> : 
                           <Enter 
                              account={account} 
                              contract={contract}
                              setSubmission={setSubmission}
                           /> 
                  : <button className='btn' onClick={web3Handler}>Connect wallet</button> 
               }
            </div>
         </div>
      </div>
   );
}

export default App;
