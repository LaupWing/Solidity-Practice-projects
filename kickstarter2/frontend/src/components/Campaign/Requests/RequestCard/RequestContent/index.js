import React from 'react'

const RequestContent = ({request}) => {
   return (
      <div className='flex flex-col my-2'>
         <h1 className='font-bold text-slate-500'>{request.title}</h1>
         <p className='text-slate-400 break-words'>{request.description}</p>
      </div>
   )
}

export default RequestContent