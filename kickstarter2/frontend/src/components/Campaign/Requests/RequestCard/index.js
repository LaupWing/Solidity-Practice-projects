import React from 'react'
import { FaEthereum } from 'react-icons/fa'

const RequestCard = ({request}) => {
   return (
      <div className='border border-slate-300 p-2'>
         <h1 className='font-bold text-slate-500'>{request.title}</h1>
         <p className='text-slate-400'>{request.description}</p>
         <h3 className='flex items-center my-2 text-xl text-green-500'>
            {request.value} ETH<FaEthereum/>
         </h3>
      </div>
   )
}

export default RequestCard