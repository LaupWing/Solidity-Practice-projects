import React from 'react'

const RequestProgress = ({request, contributors}) => {
   return (
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
   )
}

export default RequestProgress