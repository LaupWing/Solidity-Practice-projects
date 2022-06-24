import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import { useSelector } from 'react-redux'

const CampaignDetail = () => {
   const router = useRouter()
   const {address} = router.query
   const {signer, account} = useSelector(state=>state.web3)
   const [owner, setOwner] = useState(false)
   const [name, setName] = useState('')

   const fetchContract = async ()=>{
      const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
      const manager = await contract.manager()
      setName(await contract.name())
      setOwner(ethers.utils.getAddress(account) === ethers.utils.getAddress(manager))
   }

   useEffect(()=>{
      fetchContract()
   },)

   return (
      <div>CampaignDetail {name}</div>
   )
}

export default CampaignDetail