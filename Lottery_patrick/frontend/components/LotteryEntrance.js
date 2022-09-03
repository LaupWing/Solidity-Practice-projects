import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import {abi,contractAddresses} from "../constants"
import {ethers} from "ethers"
import { useNotification } from 'web3uikit'

const LotteryEntrance = () => {
   const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
   const chainId = parseInt(chainIdHex)
   const raffleAddress = chainId in contractAddresses? contractAddresses[chainId][0] : null
   const [entranceFee, seEntranceFee] = useState("")

   const dispatch = useNotification()

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

   const handleSuccess = async (tx) =>{
      await tx.wait(1)
      handleNewNotification(tx)
   }

   const handleNewNotification = ()=>{
      dispatch({
         type: "info",
         message: "Transation Complete!",
         title: "Tx Notification",
         position: "topR",
         icon: "bell"
      })
   }

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
                  await enterRaffle({
                     onSuccess: handleSuccess,
                     onError: (error) =>{ console.log(error)}
                  })
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