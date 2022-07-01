import React from 'react'


const CampaignHeader = ({name, minimum, balance}) => {
   return (
      <header className='flex flex-col text-slate-400 leading-5'>
         <h2>
            <span className='font-bold'>Name: </span>{name}
         </h2>
         <h2>
            <span className='font-bold'>Minimum: </span>{minimum}
         </h2>
         <h2>
            <span className='font-bold'>Balance: </span>{balance}
         </h2>
      </header>
   )
}

export default CampaignHeader