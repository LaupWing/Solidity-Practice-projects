import React, { useEffect, useState } from 'react'

const Entees = ({contract}) => {
   const [entees, setEntees] = useState([])

   const fetchEntees = async ()=>{
      const _entees = await contract.getPlayers()
      setEntees(_entees)
      console.log(_entees)
   }

   useEffect(()=>{
      fetchEntees()  
   },[])

   return (
      <div>
         {entees.length > 0  && <ul className='flex flex-col my-2'>
            {entees.map(entee =>(
               <li 
                  key={entee}
                  className='text-xs text-yellow-100 font-bold'
               >
                  {entee}
               </li>
            ))}
         </ul>}
      </div>
   )
}

export default Entees