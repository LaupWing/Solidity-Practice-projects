import React from 'react'
import { FaEthereum, FaHandHoldingHeart } from 'react-icons/fa'
import Contribute from './Contribute'

const CampaignHeader = ({
      name, 
      description, 
      minimum, 
      goal, 
      balance, 
      contributors, 
      show_contribute, 
      contribute, 
      thumbnail
   }) => {
   return (
      <header className='flex flex-col text-slate-400 leading-5'>
         <h2 className='text-center font-bold text-xl'>{name}</h2>
         <p className='text-center my-4'>{description}</p>
         <div className='flex items-start'>
            <div 
               className='w-3/5 relative'
               style={{
                  paddingBottom: '40%'
               }}
            >
               <img 
                  src={`https://ipfs.infura.io/ipfs/${thumbnail}`} 
                  className='w-full h-full object-cover absolute'
               />
            </div>
            <div className='mx-4 flex-1 flex flex-col h-full'>
               <div className='w-full p-0.5 rounded-full border-2 border-green-500'>
                  <div 
                     className='bg-green-500 h-2 rounded-full'
                     style={{
                        width: `${balance/goal*100}%`
                     }}
                  ></div>
               </div>
               <h3 className='flex flex-col items-start my-4 text-sm'>
                  <span className='flex items-center text-2xl text-green-500'>{balance} ETH<FaEthereum/></span>
                  Balance
               </h3>
               <h3 className='flex flex-col items-start my-4 text-sm'>
                  <span className='flex items-center text-2xl text-green-500'>{goal} ETH<FaEthereum/></span>
                  Goal
               </h3>
               <h3 className='flex flex-col items-start my-4 text-sm'>
                  <span className='flex items-center text-2xl text-slate-500'>{contributors} <FaHandHoldingHeart/></span>
                  Backers
               </h3>
               {!show_contribute && <Contribute
                  contribute={contribute}
                  minimum={minimum}
               />}
            </div>
         </div>
      </header>
   )
}

export default CampaignHeader