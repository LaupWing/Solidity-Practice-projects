import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import CampaignFactoryAbi from '../contractsData/campaign-address.json'

function MyApp({ Component, pageProps }) {
   const [account, setAccount] = useState(null)

   const web3Handler = async () =>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      setAccount(accounts[0])
      
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })

      window.ethereum.on('accountsChanged', ()=>{
         // setLoading(true)
         web3Handler()
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      loadContract(signer)
   }

   const loadContract = async (signer) =>{
      const contract = new ethers.Contract()
   }

   useEffect(()=>{
      web3Handler()
   },[])
   return <Component {...pageProps} />
}

export default MyApp
