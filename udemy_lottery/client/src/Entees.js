import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import LotteryAddress from './contractsData/lottery-address.json'

const Entees = ({contract, account}) => {
   const [entees, setEntees] = useState([])
   const [balance, setBalance] = useState('')
   const [isManager, setIsManager] = useState(false)

   const fetching = async ()=>{
      const _entees = await contract.getPlayers()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const balance = await provider.getBalance(LotteryAddress.address)
      const manager = await contract.manager()
      console.log(account.toString())
      console.log(manager.toString())
      console.log(manager.trim().toString() == account.trim().toString())
      setIsManager(account === manager)
      setEntees(_entees)
      setBalance(balance.toString())
      
   }

   useEffect(()=>{
      fetching()  
   },[])

   return (
      <div className='flex flex-col'>
         <h2 className='font-bold text-gray-400 uppercase text-sm'>Balance is : {balance}</h2>
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
         {isManager && <button className='border-white border-2 px-2 bg-yellow-400 text-white py-1 rounded font-bold text-xs'>LETS GO</button>}
      </div>
   )
}

export default Entees