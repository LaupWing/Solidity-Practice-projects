import React from 'react'
import RequestCard from './RequestCard'

const CampaingRequests = ({requests, owner, contributors, approveRequest}) => {
   return (
      // <table className='rounded overflow-hidden border border-slate-600 font-normal mt-4'>
      //    <tbody>
      //       <tr className='bg-slate-200 text-slate-400 text-sm'>
      //          <th>Title</th>
      //          <th>Description</th>
      //          <th>Value</th>
      //          <th>Recipient</th>
      //          <th>Approvals</th>
      //          {owner ? <th>Send</th> : <th>Approve</th>}
      //       </tr>
      //       {requests.map((r,i) =>(
      //          <tr 
      //          className='bg-slate-100'
      //          key={i}
      //          >
      //             <th>{r.title}</th>
      //             <th>{r.description}</th>
      //             <th>{r.value}</th>
      //             <th>{r.recipient}</th>
      //             <th>{r.approvalCount}/{contributors}</th>
      //             {owner ? <th>
                     
      //             </th> : <th>

      //             </th>}
      //          </tr>
      //       ))}
      //    </tbody>
      // </table>
      <div className='grid grid-cols-3 gap-2'>
         {requests.map((request, i)=>(
            <RequestCard
               request={request}
               contributors={contributors}
               approveRequest={approveRequest}
               owner={owner}
               index={i}
               key={i}
            />
         ))}
      </div>
   )
}

export default CampaingRequests