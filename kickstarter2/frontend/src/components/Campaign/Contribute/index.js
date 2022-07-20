import { ethers } from 'ethers'
import React, { useState } from 'react'

const Contribute = ({contribute, minimum}) => {
   const [contribution, setContribution] = useState(0)

   const handleSubmit = e =>{
      e.preventDefault()
      if(Number(contribution) <= minimum){
         alert('Minimum not met')
         return
      }
      contribute(ethers.utils.parseEther(contribution))
   }

   return (
      <form 
         className='my-4 flex flex-col border border-slate-300 w-full p-1 rounded mt-auto'
         onSubmit={handleSubmit}
      >
         <p className='mb-1 text-xs uppercase font-bold text-slate-400'>Minimum: {minimum} ETH</p>
         <div className='flex'>
            <input 
               type="number" 
               value={contribution}
               onChange={e=>setContribution(e.target.value)}
               className='rounded flex-1 mr-1 px-1 w-40 bg-slate-200 focus:outline-none'
            />
            <button 
               className='btn bg-green-500'
            >
               Contribute (ETH)
            </button>
         </div>
      </form>
   )
}

export default Contribute