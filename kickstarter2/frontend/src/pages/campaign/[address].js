import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'

const CampaignDetail = () => {
   const router = useRouter()
   const {address} = router.query
   const {signer, account} = useSelector(state=>state.web3)
   const [owner, setOwner] = useState(false)
   const [name, setName] = useState('')
   const [loading, setLoading] = useState(true)

   const fetchContract = async ()=>{
      const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
      const manager = await contract.manager()
      setName(await contract.name())
      setOwner(ethers.utils.getAddress(account) === ethers.utils.getAddress(manager))
      setLoading(false)
   }

   useEffect(()=>{
      fetchContract()
   },)

   return (
      loading ? 
         <ReactLoading className='m-auto'/> : 
         <div className='p-3'>
            <h2 className='font-bold text-slate-600'>
               {name}
            </h2>
         </div>
   )
}

export default CampaignDetail