import React, { useState } from 'react'

const CreateCampaign = () => {
   const [name, setName] = useState('')
   const [minimum, setMinimum] = useState(0)

   const handleSubmit = e =>{
      e.preventDefault()
      console.log(name)
      console.log(minimum)
   }

   return (
      <main className='w-full p-4 max-w-2xl mx-auto'>
         <form 
            className='w-full p-2 bg-white rounded shadow flex flex-col'
            onSubmit={handleSubmit}
         >
            <h2 className='text-slate-600 uppercase font-bold text-sm tracking-wider'>Create campaign</h2>
            <div className='w-full flex my-2'>
               <input 
                  type="text"  
                  className='focus:outline-none border border-slate-400 p-0.5 px-2 rounded flex-1'
                  placeholder='Campaign Name'
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  required
               />
               <input 
                  type="number" 
                  className='focus:outline-none border ml-1 w-24 px-2 border-slate-400 rounded' 
                  placeholder='1'
                  value={minimum}
                  onChange={e=>setMinimum(e.target.value)}
                  required
               />
            </div>
            <button className='mx-auto my-2 bg-green-500 rounded uppercase text-xs tracking-wider font-bold text-white px-3 py-1'>Create</button>
         </form>
      </main>
   )
}

export default CreateCampaign