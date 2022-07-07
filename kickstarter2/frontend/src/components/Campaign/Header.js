import React from 'react'
import {ethers} from 'ethers'

const CampaignHeader = ({name, minimum, balance, contributors}) => {
   return (
      <header className='flex flex-col text-slate-400 leading-5'>
         <h2>
            <span className='font-bold'>Name: </span>{name}
         </h2>
         <h2>
            <span className='font-bold'>Minimum (Ether): </span>{ethers.utils.formatEther(minimum)}
         </h2>
         <h2>
            <span className='font-bold'>Balance (Ether): </span>{ethers.utils.formatEther(balance)}
         </h2>
         <h2>
            <span className='font-bold'>Contributors: </span>{contributors}
         </h2>
      </header>
   )
}

export default CampaignHeader