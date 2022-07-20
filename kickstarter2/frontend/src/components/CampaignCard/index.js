import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import Link from 'next/link'
import ReactLoading from 'react-loading'
import { FaEthereum } from 'react-icons/fa'

const CampaignCard = ({address}) => {
   const {signer} = useSelector(state => state.web3)
   const [name, setName] = useState('')
   const [minimum, setMinimum] = useState(0)
   const [balance, setBalance] = useState(0)
   const [loading, setLoading] = useState(true)
   const [goal, setGoal] = useState(true)
   const [manager, setManager] = useState(true)
   const [description, setDescription] = useState(true)
   const [thumbnail, setThumbnail] = useState(true)

   useEffect(()=>{
      const getCampaign = async ()=>{
         const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
         const [
            _minimum,
            _goal,
            _balance,
            _manager,
            _thumbnail,
            _description,
            _name
         ] = await contract.summary()
         
         setDescription(_description)
         setGoal(Number(ethers.utils.formatEther(_goal)))
         setBalance(Number(ethers.utils.formatEther(_balance)))
         setThumbnail(_thumbnail)
         setManager(_manager)
         setName(_name)
         setMinimum(Number(ethers.utils.formatEther(_minimum.toString())))
         setLoading(false)
      }
      getCampaign()
   },[])
   return (
      <Link href={`/campaign/${address}`}>
         <div className='w-full max-w-xs border border-slate-300 flex hover:shadow cursor-pointer overflow-hidden hover:scale-[.99] duration-200 transform'>
            {loading ? 
               <ReactLoading className='mx-auto my-20'/> :
               <div className='flex flex-col justify-between w-full'>
                  <div className='relative'>
                     <p className='bg-white text-xs text-slate-500 w-20 rounded-full text-center right-2 top-2 py-0.5 absolute flex items-center justify-center'>
                        {minimum} ETH<FaEthereum/>
                     </p>
                     <img 
                        src={`https://ipfs.infura.io/ipfs/${thumbnail}`} 
                        className='w-full h-52 object-cover'
                     />
                  </div>
                  <div className='p-2'>
                     <h2 className='text-slate-500 text-xl'>{name}</h2>
                     <p className='text-slate-400 text-sm h-12 text-ellipsis overflow-hidden leading-6 line-clamp-2'>{description}</p>
                     <p className='max-w-full my-4 text-slate-300 truncate text-xs'>
                        by  <b>{manager}</b>
                     </p>
                     <div className='flex flex-col'>
                        <div className='w-full p-0.5 rounded-full border-2 border-green-500'>
                           <div 
                              className='bg-green-500 h-2 rounded-full'
                              style={{
                                 width: `${balance/goal*100}%`
                              }}
                           ></div>
                        </div>
                        <div className='flex flex-col font-bold text-xs uppercase text-green-500 my-4 space-y-1'>
                           <h3 className='flex items-center justify-between'>
                              Goal: 
                              <span className='flex items-center'>{goal} ETH<FaEthereum/></span>
                           </h3>
                           <h3 className='flex items-center justify-between'>
                              Current: 
                              <span className='flex items-center'>{balance} ETH<FaEthereum/></span>
                           </h3>
                           <h3 className='flex items-center justify-between text-slate-300'>
                              Funded: <span>{Math.round(balance/goal*100)} %</span>
                           </h3>
                        </div>
                     </div>
                  </div>
               </div>
            }
         </div>
      </Link>
   )
}

export default CampaignCard