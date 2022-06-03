import React, { useEffect, useState } from 'react'

const Entees = async ({contract}) => {
   const [entees, setEntees] = useState([])

   const fetchEntees = async ()=>{
      const _entees = await contract.getPlayers()
      setEntees(_entees)
   }

   useEffect(()=>{
      fetchEntees()
   },[])

   return (
      <div>Entees</div>
   )
}

export default Entees