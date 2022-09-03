import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import {abi,contractAddresses} from "../constants"
import {ethers} from "ethers"

const LotteryEntrance = () => {
   const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
   const chainId = parseInt(chainIdHex)
   const raffleAddress = chainId in contractAddresses? contractAddresses[chainId][0] : null
   const [entranceFee, seEntranceFee] = useState("")

   const {runContractFunction: enterRaffle} = useWeb3Contract({
      abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: entranceFee
   })

   const {runContractFunction: getEntranceFee} = useWeb3Contract({
      abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      msgValue: 0
   })

   useEffect(()=>{
      if(isWeb3Enabled){
         async function updateUI(){
            seEntranceFee((await getEntranceFee()).toString())
         }
         updateUI()
      }
   },[isWeb3Enabled])

   return (
      <div>
         Hi from Lottery
         {raffleAddress ? (
            <div>
               <button onClick={async ()=>{
                  await enterRaffle()
               }}>Enter Raffle</button>
               {ethers.utils.formatUnits(entranceFee, "ethers")} ETH
            </div>
         ):( 
            <div>
               No Raffle Address detected
            </div>
         )}
      </div>
   )
}

export default LotteryEntrance