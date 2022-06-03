import React, { useEffect, useState } from 'react'

const Entees = ({contract}) => {
   const [entees, setEntees] = useState([])

   const fetchEntees = async ()=>{
      const _entees = await contract.getPlayers()
      // setEntees(_entees)
      console.log(_entees)
   }

   useEffect(()=>{
      fetchEntees()  
   },[])

   return (
      <div>Entees</div>
   )
}

export default Entees