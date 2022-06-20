import { ethers, providers } from 'ethers'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import CampaignFactoryAbi from '../contractsData/campaignFactory.json'
import CampaignFactoryAddress from '../contractsData/campaignFactory-address.json'

function MyApp({ Component, pageProps }) {
   const [account, setAccount] = useState(null)
   const [contract, setContract] = useState(null)

   const web3Handler = async () =>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      setAccount(accounts[0])
      
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })

      window.ethereum.on('accountsChanged', ()=>{
         web3Handler()
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      console.log(signer)
      loadContract(signer)
   }
   const loadContract = async (signer) =>{
      const _contract = new ethers.Contract( CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
      const test = await _contract.getDeployedCampaigns()
      console.log(test)
      console.log(_contract)
      setContract(_contract)
   }

   useEffect(()=>{
      web3Handler()
   },[])
   return <Component {...pageProps} />
}

export default MyApp
