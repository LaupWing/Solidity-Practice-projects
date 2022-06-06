import React, { useEffect, useState } from 'react'

const Enter = ({contract, setSubmission}) => {
   const [minimum, setMinimum] = useState(0)
   const [enterFee, setEnterFee] = useState(0)

   useEffect(()=>{
      const fetching = async ()=>{
         const _minimum = await contract.minimum()
         setMinimum(Number(_minimum.toString()))
      }
      fetching()
   },[])

   const enterLottery = async (event)=>{
      event.preventDefault()
      if(minimum > enterFee){
         alert('Enter fee should be above ', enterFee)
         return
      }
      await (await contract.enter({value: enterFee})).wait()
      setSubmission(enterFee)
   }

   return (
      <div className='flex flex-col'>
         <p className='text-yellow-100 text-sm my-1 uppercase font-bold'>Minimum Ether: {minimum}</p>
         <form 
            className='flex'
            onSubmit={enterLottery}
         >
            <input 
               type="number"  
               value={enterFee} 
               onChange={e=>setEnterFee(e.target.value)}
               className="rounded border-2 border-yellow-500 focus:outline-none p-1 py-0.5"
            />
            <button className='btn'>enter</button>
         </form>
      </div>
   )
}

export default Enter