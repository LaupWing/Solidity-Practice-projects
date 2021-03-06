import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import RequestHeader from './Header'
import RequestContent from './RequestContent'
import RequestProgress from './RequestProgress'

const RequestCard = ({
   request,
   contributors,
   index,
   owner,
   sendRequest,
   approveRequest, 
   denyRequest, 
   contract
}) => {
   const [answered, setAnswered] = useState(false)
   const [loading, setLoading] = useState(true)

   const fetchInfo = async ()=>{
      const answersed = await contract.answeredRequest(index) 
      const approved = answersed[0]
      const denied = answersed[1]
      setAnswered({
         approved,
         denied
      })
      setLoading(false)
   }

   useEffect(()=>{
      fetchInfo()
   },[])

   return (
      <div className='border border-slate-300 p-2 flex flex-col rounded bg-slate-50 relative'>
         {request.complete && <div className='absolute inset-0 bg-white bg-opacity-90 flex justify-center items-center text-slate-300 font-bold text-sm'>
            <p>ALREADY SENDED</p>
         </div>}
         <RequestHeader request={request}/>
         <RequestContent request={request}/>
         <RequestProgress request={request} contributors={contributors}/>
         {owner ? !request.complete ? ( 
            <button 
               className={'text-xs py-1 text-white uppercase px-2 rounded m-1 ' + `${Number(request.approvalCount) > (Number(contributors)/2) ? 'bg-blue-500' : 'bg-slate-300 cursor-not-allowed'}`}
               onClick={()=>sendRequest(index)}
            >
               Send
            </button>
            ) : (
               <p className='text-xs py-1 font-bold text-slate-300 uppercase'>Request is already send</p>
            ) : 
         ((!answered.approved && !answered.denied && !loading) ? <div className='flex w-full justify-between'>
            <button 
               className='text-xs bg-red-500 py-1 text-white uppercase px-2 rounded w-20'
               onClick={()=>denyRequest(index)}
            >
               deny
            </button>
            <button 
               className='text-xs bg-green-500 py-1 text-white uppercase px-2 rounded w-20'
               onClick={()=>approveRequest(index)}
            >
               Approve
            </button>
         </div> : <p className='text-xs py-1 font-bold text-slate-300 uppercase'>You have already responded here</p>)
         }
      </div>
   )
}

export default RequestCard