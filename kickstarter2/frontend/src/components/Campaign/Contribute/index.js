import React, { useState } from 'react'

const Contribute = ({contribute}) => {
   const [contribution, setContribution] = useState(0)

   const handleSubmit = e =>{
      e.preventDefault()
      if(Number(contribution) <= minimum){
         alert('Minimum not met')
         return
      }
      contribute(contribution)
   }

   return (
      <>
         
         <form 
            className='my-4 flex border border-slate-300 mr-auto p-1 rounded'
            onSubmit={handleSubmit}
         >
            <input 
               type="number" 
               value={contribution}
               onChange={e=>setContribution(e.target.value)}
               className='rounded mr-1 px-1 w-40 bg-slate-200 focus:outline-none'
            />
            <button 
               className='btn'
            >
               Contribute
            </button>
         </form>
      </>
   )
}

export default Contribute