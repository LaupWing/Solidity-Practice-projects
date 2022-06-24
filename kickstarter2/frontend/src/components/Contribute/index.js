import React from 'react'

const Contribute = () => {
   return (
      <div className='my-4 flex'>
         <input 
            type="number" 
            value={0}
            className='rounded mr-1 px-1 w-40'
         />
         <button 
            className='rounded bg-green-500 mr-auto px-4 text-xs uppercase text-white font-bold py-1'
         >
            Contribute
         </button>
      </div>
   )
}

export default Contribute