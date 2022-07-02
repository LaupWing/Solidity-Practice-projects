import React from 'react'

const CampaingRequests = ({requests}) => {
   return (
      <table className='rounded overflow-hidden border border-slate-600 font-normal'>
         <tbody>
            <tr className='bg-slate-200 text-slate-400 text-sm'>
               <th>Title</th>
               <th>Description</th>
               <th>Value</th>
               <th>Recipient</th>
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
               </tr>
            ))}
         </tbody>
      </table>
   )
}

export default CampaingRequests