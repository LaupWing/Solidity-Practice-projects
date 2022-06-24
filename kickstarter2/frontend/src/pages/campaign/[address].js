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
   const [minimum, setMinimum] = useState(false)
   const [name, setName] = useState('')
   const [loading, setLoading] = useState(true)

   const fetchContract = async ()=>{
      const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
      const manager = await contract.manager()
      console.log((await contract.approversCount()).toString())
      setName(await contract.name())
      setMinimum((await contract.minimum_contribution()).toString())
      setOwner(ethers.utils.getAddress(account) === ethers.utils.getAddress(manager))
      setLoading(false)
   }

   useEffect(()=>{
      fetchContract()
   },)

   return (
      loading ? 
         <ReactLoading className='m-auto'/> : 
         <div className='p-3 flex flex-col'>
            <h2 className='font-bold text-slate-400 flex'>
               {name}
               <span className='ml-auto text-slate-600'>{minimum}</span>
            </h2>

         </div>
   )
}

export default CampaignDetail