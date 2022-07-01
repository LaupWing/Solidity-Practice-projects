import React, { useEffect, useState } from 'react'


const CampaignHeader = ({name, minimum}) => {
   return (
      <header>
         <h2 className='font-bold text-slate-400 flex'>
            {name}
            <span className='ml-auto text-slate-600'>{minimum}</span>
         </h2>
      </header>
   )
}

export default CampaignHeader