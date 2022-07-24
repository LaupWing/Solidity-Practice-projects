import React from 'react'
import RequestCard from './RequestCard'

const CampaingRequests = ({requests, owner, contributors, approveRequest, contract}) => {
   return (
      <div className='grid grid-cols-3 gap-4'>
         {requests.map((request, i)=>(
            <RequestCard
               request={request}
               contract={contract}
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