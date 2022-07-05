import React from 'react'

const CampaingRequests = ({requests, owner, contributors}) => {
   return (
      <table className='rounded overflow-hidden border border-slate-600 font-normal mt-4'>
         <tbody>
            <tr className='bg-slate-200 text-slate-400 text-sm'>
               <th>Title</th>
               <th>Description</th>
               <th>Value</th>
               <th>Recipient</th>
               <th>Approvals</th>
               {owner && <th>Send</th>}
            </tr>
            {requests.map((r,i) =>(
               <tr 
               className='bg-slate-100'
               key={i}
               >
                  <th>{r.title}</th>
                  <th>{r.description}</th>
                  <th>{r.value}</th>
                  <th>{r.recipient}</th>
                  <th>{r.approvalCount}/{contributors}</th>
                  {owner && <th>
                     <button className='text-xs bg-blue-500 py-1 text-white uppercase px-2 rounded m-1'>
                        Send
                     </button>
                  </th>}
               </tr>
            ))}
         </tbody>
      </table>
   )
}

export default CampaingRequests