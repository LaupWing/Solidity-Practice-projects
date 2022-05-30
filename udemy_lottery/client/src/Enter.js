import React, { useEffect, useState } from 'react'

const Enter = ({contract}) => {
   const [minimum, setMinimum] = useState(0)
   useEffect(()=>{
      const fetching = async ()=>{
         const _minimum = await contract.minimum()
         setMinimum(Number(_minimum.toString()))
      }
      fetching()
   },[])
   return (
      <div className='flex rounded m-2 space-x-1 items-center'>
         <p>Minimum: {minimum}</p>
         <input 
            type="number"  
            value={10} 
            className="rounded border-2 border-yellow-500"
         />
         <button className='btn'>enter</button>
      </div>
   )
}

export default Enter