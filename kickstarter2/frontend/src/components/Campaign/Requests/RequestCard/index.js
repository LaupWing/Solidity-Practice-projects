import React from 'react'
import RequestHeader from './Header'
import RequestContent from './RequestContent'

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
         <RequestHeader request={request}/>
         <RequestContent request={request}/>
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