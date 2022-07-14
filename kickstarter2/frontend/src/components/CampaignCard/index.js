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
   const [description, setDescription] = useState(true)
   const [thumbnail, setThumbnail] = useState(true)

   useEffect(()=>{
      const getCampaign = async ()=>{
         const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
         console.log(await contract.description())
         setDescription(await contract.description())
         setThumbnail(await contract.thumbnail())
         setName(await contract.name())
         setMinimum(ethers.utils.formatEther((await contract.minimum_contribution()).toString()))
         setLoading(false)
      }
      getCampaign()
   },[])

   return (
      <Link href={`/campaign/${address}`}>
         <div className='w-full max-w-xs bg-slate-300 flex rounded shadow cursor-pointer border-transparent overflow-hidden'>
            {loading ? 
               <ReactLoading className='mx-auto my-20'/> :
               <div className='flex flex-col font-bold justify-between w-full'>
                  <div className='relative'>
                     <p className='text-white text-xs bg-slate-500 w-20 rounded-full text-center right-2 top-2 py-1 absolute'>{minimum} (ETH)</p>
                     <img 
                        src={`https://ipfs.infura.io/ipfs/${thumbnail}`} 
                        className='w-full h-52 object-cover'
                     />
                  </div>
                  <div className='p-2'>
                     <h2 className='text-slate-500'>{name}</h2>
                     <p>{description}</p>
                  </div>
               </div>
            }
         </div>
      </Link>
   )
}

export default CampaignCard