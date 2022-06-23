import React from 'react'

const CreateCampaign = () => {
   return (
      <main className='w-full p-4 max-w-2xl mx-auto'>
         <form className='w-full p-2 bg-white rounded shadow flex flex-col'>
            <h2 className='text-slate-600 uppercase font-bold text-sm tracking-wider'>Create campaign</h2>
            <div className='w-full flex my-2'>
               <input 
                  type="text"  
                  className='border border-slate-400 p-0.5 px-2 rounded flex-1'
                  placeholder='Campaign Name'
                  required
               />
               <input 
                  type="number" 
                  className='border ml-1 w-24 px-2 border-slate-400 rounded' 
                  placeholder='1'
                  required
               />
            </div>
            <button className='mx-auto my-2 bg-green-500 rounded uppercase text-xs tracking-wider font-bold text-white px-3 py-1'>Create</button>
         </form>
      </main>
   )
}

export default CreateCampaign