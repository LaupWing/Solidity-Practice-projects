import React from 'react'
import { FaEthereum } from 'react-icons/fa'

const RequestCard = ({
   request,
   contributors,
   index,
   owner,
   approveRequest
}) => {
   console.log(request)
   return (
      <div className='border border-slate-300 p-2 flex flex-col'>
         <div className='flex justify-between items-center'>
            <p className='truncate text-sm text-slate-400'>{request.recipient}</p>
            <h3 className='flex ml-auto shrink-0 items-center rounded-full px-4 py-0.5 bg-slate-200 text-md text-slate-500'>
               {request.value} ETH<FaEthereum/>
            </h3>
         </div>
         <h1 className='font-bold text-slate-500'>{request.title}</h1>
         <p className='text-slate-400'>{request.description}</p>
         <div className='flex flex-col my-2 mt-auto'>
            <div className='w-full border-2 border-green-500 rounded-full p-0.5'>
               <div
                  className='bg-green-500 h-1.5 rounded-full'
                  style={{
                     width: `${(Number(request.approvalCount)/Number(contributors)) * 100}%`
                  }}
               >

               </div>
            </div>

            <div className='flex justify-between'>
               <p className='text-green-500 font-bold'>{request.approvalCount}/{contributors}</p>
               <p className='text-slate-400'>{(Number(contributors)/2) - Number(request.approvalCount)} left</p>
            </div>
         </div>
         {owner ? ( 
            <button 
               className={'text-xs py-1 text-white uppercase px-2 rounded m-1 ' + `${Number(request.approvalCount) > (Number(contributors)/2) ? 'bg-blue-500' : 'bg-slate-300 cursor-not-allowed'}`}
               >
               Send
            </button>
         ) : 
         <div className='flex w-full justify-between'>
            <button 
               className='text-xs bg-red-500 py-1 text-white uppercase px-2 rounded w-20'
               onClick={()=>approveRequest(index)}
            >
               deny
            </button>
            <button 
               className='text-xs bg-green-500 py-1 text-white uppercase px-2 rounded w-20'
               onClick={()=>approveRequest(index)}
            >
               Approve
            </button>
         </div>
         }
      </div>
   )
}

export default RequestCard