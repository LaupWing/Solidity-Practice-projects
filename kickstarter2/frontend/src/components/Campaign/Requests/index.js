import React from 'react'

const CampaingRequests = ({requests}) => {
   return (
      <table className='table-fixed rounded overflow-hidden border border-slate-600'>
         <tbody>
            <tr className='bg-slate-200 text-slate-400 text-sm'>
               <th>Title</th>
               <th>Description</th>
               <th>Value</th>
               <th>Recipient</th>
            </tr>
            {requests.map((r,i) =>(
               <tr 
                  className='bg-slate-100 font-normal'
                  key={i}
               >
                  <th>{r.title}</th>
                  <th>{r.description}</th>
                  <th>{r.value}</th>
                  <th>{r.recipient}</th>
               </tr>
            ))}
         </tbody>
      </table>
   )
}

export default CampaingRequests