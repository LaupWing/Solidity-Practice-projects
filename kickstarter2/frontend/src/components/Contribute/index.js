import React, { useState } from 'react'

const Contribute = ({contract, minimum}) => {
   const [contribution, setContribution] = useState(0)

   const handleSubmit = async e =>{
      e.preventDefault()
      if(contribution <= minimum){
         alert('Minimum not met')
         return
      }

      const transation = await contract.contribute({value: contribution})
      await transation.wait()
   }

   return (
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
   )
}

export default Contribute