import React, { useEffect, useState } from 'react'


const CampaignHeader = ({contract}) => {
   const [minimum, setMinimum] = useState(false)
   const [name, setName] = useState('')

   const fetchInfo = async ()=>{
      setName(await contract.name())
      setMinimum((await contract.minimum_contribution()).toString())
   }

   useEffect(()=>{
      fetchInfo()
   },[])

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