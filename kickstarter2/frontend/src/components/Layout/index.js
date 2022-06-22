import React from 'react'
import { ethers } from 'ethers'
import { useEffect } from 'react'
import CampaignFactoryAbi from '../../../contractsData/campaignFactory.json'
import CampaignFactoryAddress from '../../../contractsData/campaignFactory-address.json'
import { useDispatch } from 'react-redux'
import { setWeb3 } from '../../features/web3Slice'

const Layout = ({children}) => {
   const dispatch = useDispatch()

   const web3Handler = async () =>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })

      window.ethereum.on('accountsChanged', ()=>{
         web3Handler()
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract( CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
      
      dispatch(setWeb3({
         account: accounts[0]
      }))
   }

   useEffect(()=>{
      web3Handler()
   },[])
   return (
      <div>{children}</div>
   )
}

export default Layout