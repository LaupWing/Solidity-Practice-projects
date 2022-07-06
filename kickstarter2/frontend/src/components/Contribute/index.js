import React, { useState } from 'react'
import ReactLoading from 'react-loading'

const Contribute = ({contract, minimum, fetchInfo}) => {
   const [contribution, setContribution] = useState(0)
   const [loading, setLoading] = useState(false)

   const handleSubmit = async e =>{
      e.preventDefault()
      setLoading(true)
      if(contribution <= minimum){
         alert('Minimum not met')
         return
      }

      const transation = await contract.contribute({value: contribution})
      await transation.wait()
      setLoading(false)
      fetchInfo()
   }

   return (
      <>
         {loading && <div className='absolute inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center'>
            <ReactLoading/>
         </div>}
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