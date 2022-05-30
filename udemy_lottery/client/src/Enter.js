import React, { useEffect, useState } from 'react'

const Enter = ({contract}) => {
   const [minimum, setMinimum] = useState(0)
   const [enterFee, setEnterFee] = useState(0)
   useEffect(()=>{
      const fetching = async ()=>{
         const _minimum = await contract.minimum()
         setMinimum(Number(_minimum.toString()))
      }
      fetching()
   },[])

   const enterLottery = async ()=>{
      
   }

   return (
      <div className='flex flex-col rounded m-2 items-start bg-yellow-400 p-2'>
         <p className='text-yellow-100 text-sm my-1 uppercase font-bold'>Minimum: {minimum}</p>
         <div className='flex'>
            <input 
               type="number"  
               value={enterFee} 
               onChange={e=>setEnterFee(e.target.value)}
               step={100}
               className="rounded border-2 border-yellow-500 focus:outline-none p-1 py-0.5"
            />
            <button className='btn'>enter</button>
         </div>
      </div>
   )
}

export default Enter