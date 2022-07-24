import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import RequestHeader from './Header'
import RequestContent from './RequestContent'
import RequestProgress from './RequestProgress'

const RequestCard = ({
   request,
   contributors,
   index,
   owner,
   approveRequest, 
   contract
}) => {
   const {account} = useSelector(state=>state.web3)
   const [canAnswer, setCanAnswer] = useState(false)
   const [loading, setLoading] = useState(false)

   const fetchInfo = async ()=>{
      setAlreadyContributed(await contract.answeredRequest(index))
   }
   console.log(canAnswer)

   useEffect(()=>{
      fetchInfo
   })

   return (
      <div className='border border-slate-300 p-2 flex flex-col rounded bg-slate-50'>
         <RequestHeader request={request}/>
         <RequestContent request={request}/>
         <RequestProgress request={request} contributors={contributors}/>
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