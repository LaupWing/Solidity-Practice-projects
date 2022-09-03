import React from 'react'
import { useWeb3Contract } from 'react-moralis'

const LotteryEntrance = () => {
   const {runContractFunction: enterRaffle} = useWeb3Contract({
      
   })

   return (
      <div>Hi from Lottery</div>
   )
}

export default LotteryEntrance