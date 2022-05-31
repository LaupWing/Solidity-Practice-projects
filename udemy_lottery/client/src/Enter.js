import React, { useEffect, useState } from 'react'

const Enter = ({contract, account}) => {
   const [minimum, setMinimum] = useState(0)
   const [enterFee, setEnterFee] = useState(0)
   const [entees, setEntees] = useState([])
   const [submission, setSubmission] = useState(0)
   const [alreadyEntered, setAlreadyEntered] = useState(true)

   useEffect(()=>{
      const fetching = async ()=>{
         const _minimum = await contract.minimum()
         const _entees = await contract.getPlayers()
         const manager = await contract.manager()
         console.log(manager)

         const entered = await contract.entees(account)
         if(entered.toString() === '0'){
            setAlreadyEntered(false)
         }else{
            setSubmission(entered.toString())
         }

         setEntees(_entees)
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
      await contract.enter({value: enterFee})
   }

   return (
      <div className='flex flex-col rounded m-2 items-start bg-yellow-400 p-2'>
         {entees.length > 0  && <ul className='flex flex-col my-2'>
            {entees.map(entee =>(
               <li 
                  key={entee}
                  className='text-xs text-yellow-200 font-bold'
               >
                  {entee}
               </li>
            ))}
         </ul>}
         <div className='flex flex-col'>
            <p className='text-yellow-100 text-sm my-1 uppercase font-bold'>Minimum: {minimum}</p>
            {!alreadyEntered ? <form 
               className='flex'
               onSubmit={enterLottery}
            >
               <input 
                  type="number"  
                  value={enterFee} 
                  onChange={e=>setEnterFee(e.target.value)}
                  step={100}
                  className="rounded border-2 border-yellow-500 focus:outline-none p-1 py-0.5"
               />
               <button className='btn'>enter</button>
            </form> : <p>Your submission: {submission}</p>}
         </div>
      </div>
   )
}

export default Enter