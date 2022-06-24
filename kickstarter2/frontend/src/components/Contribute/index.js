import React, { useState } from 'react'

const Contribute = ({contract, minimum}) => {
   const [contribution, setContribution] = useState(0)

   const handleSubmit = e =>{
      e.preventDefault()
      if(contribution <= minimum){
         alert('Minimum not met')
         return
      }
      console.log(contract)
      console.log(contribution)
   }

   return (
      <form 
         className='my-4 flex'
         onSubmit={handleSubmit}
      >
         <input 
            type="number" 
            value={contribution}
            onChange={e=>setContribution(e.target.value)}
            className='rounded mr-1 px-1 w-40'
         />
         <button 
            className='rounded bg-green-500 mr-auto px-4 text-xs uppercase text-white font-bold py-1'
         >
            Contribute
         </button>
      </form>
   )
}

export default Contribute