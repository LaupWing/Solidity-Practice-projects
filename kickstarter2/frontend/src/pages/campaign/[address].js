import React from 'react'
import { useRouter } from 'next/router'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import { useSelector } from 'react-redux'

const CampaignDetail = () => {
   const router = useRouter()
   const {address} = router.query
   const {signer, account} = useSelector(state=>state.web3)

   const fetchContract = async ()=>{
      const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
      const manager = await contract.manager()
      console.log(manager)
      console.log(account)
      console.log(ethers.utils.getAddress(account) === ethers.utils.getAddress(manager))
   }
   fetchContract()

   return (
      <div>CampaignDetail</div>
   )
}

export default CampaignDetail