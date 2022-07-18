import React from 'react'

const CampaignHeader = ({
      name, 
      description, 
      minimum, 
      goal, 
      balance, 
      contributors, 
      thumbnail
   }) => {
   return (
      <header className='flex flex-col text-slate-400 leading-5'>
         <h2 className='text-center font-bold text-xl'>{name}</h2>
         <p className='text-center my-4'>{description}</p>
         {/* <h2>
            <span className='font-bold'>Minimum (Ether): </span>{minimum}
         </h2>
         <h2>
            <span className='font-bold'>Balance (Ether): </span>{balance}
         </h2>
         <h2>
            <span className='font-bold'>Contributors: </span>{contributors}
         </h2> */}
         <div className='flex items-start'>
            <div 
               className='w-2/3 relative'
               style={{
                  paddingBottom: '40%'
               }}
            >
               <img 
                  src={`https://ipfs.infura.io/ipfs/${thumbnail}`} 
                  className='w-full h-full object-cover absolute'
               />
            </div>
            <div className='mx-4 flex-1'>
               <div className='w-full p-0.5 rounded-full border-2 border-green-500'>
                  <div 
                     className='bg-green-500 h-2 rounded-full'
                     style={{
                        width: `${balance/goal*100}%`
                     }}
                  ></div>
               </div>
            </div>
         </div>
      </header>
   )
}

export default CampaignHeader