import React from 'react'
import { FaEthereum } from 'react-icons/fa'

const RequestHeader = ({request}) => {
   return (
      <header className='flex justify-between items-center'>
         <p className='truncate text-sm text-slate-400'>{request.recipient}</p>
         <h3 className='flex ml-auto shrink-0 items-center rounded-full px-4 py-0.5 bg-slate-200 text-md text-slate-500'>
            {request.value} ETH<FaEthereum/>
         </h3>
      </header>
   )
}

export default RequestHeader