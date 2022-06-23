import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import Link from 'next/link'
import ReactLoading from 'react-loading'

const CampaignCard = ({address}) => {
   const {signer} = useSelector(state => state.web3)
   const [name, setName] = useState('')
   const [minimum, setMinimum] = useState(0)
   const [loading, setLoading] = useState(true)

   useEffect(()=>{
      const getCampaign = async ()=>{
         const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
         const name = await contract.name()
         const minimum = await contract.minimum_contribution()
         setName(name)
         setMinimum(minimum.toString())
         setLoading(false)
      }
      getCampaign()
   },[])

   return (
      <Link href={`/campaign/${address}`}>
         <div className='w-full p-2 bg-slate-300 flex rounded shadow cursor-pointer hover:border-indigo-500 border-2 border-transparent'>
            {loading ? 
               <ReactLoading className='mx-auto'/> :
               <div className='flex text-xl font-bold p-2 justify-between w-full'>
                  <h2 className='text-slate-500'>{name}</h2>
                  <p className='text-white'>{minimum}</p>
               </div>
            }
         </div>
      </Link>
   )
}

export default CampaignCard