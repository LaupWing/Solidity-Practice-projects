import { ethers } from 'ethers'
import React, { useEffect } from 'react'

const Enter = ({contract}) => {

   useEffect(()=>{
      const fetching = async ()=>{
         console.log(contract)
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const minimum = await contract.minimum()
         console.log(Number(minimum.toString()))
      }
      fetching()
   },[])
   return (
      <div>Enter</div>
   )
}

export default Enter