import React from 'react'
import { FaEthereum } from 'react-icons/fa'

const RequestCard = ({request,contributors}) => {
   return (
      <div className='border border-slate-300 p-2 flex flex-col'>
         <h3 className='flex ml-auto items-center rounded-full px-4 py-0.5 bg-slate-200 text-xs text-slate-500'>
            {request.value} ETH<FaEthereum/>
         </h3>
         <h1 className='font-bold text-slate-500'>{request.title}</h1>
         <p className='text-slate-400'>{request.description}</p>
         <div className='flex flex-col my-2'>
            <div className='w-full border-2 border-green-500 rounded-full p-0.5'>
               <div
                  className='bg-green-500 h-1.5 rounded-full'
                  style={{
                     width: '50%'
                  }}
               >

               </div>
            </div>
            <p className='text-green-500 font-bold'>{request.approvalCount}/{contributors}</p>
         </div>
      </div>
   )
}

export default RequestCard