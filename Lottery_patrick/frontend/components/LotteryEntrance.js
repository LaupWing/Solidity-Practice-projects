import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import {abi,contractAddresses} from "../constants"
import {ethers} from "ethers"
import { useNotification } from 'web3uikit'

const LotteryEntrance = () => {
   const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
   const chainId = parseInt(chainIdHex)
   const raffleAddress = chainId in contractAddresses? contractAddresses[chainId][0] : null
   const [entranceFee, seEntranceFee] = useState("0")
   const [numPlayers, setNumPlayers] = useState("")
   
   const [recentWinner, setRecentWinner] = useState("")

   const dispatch = useNotification()

   const {runContractFunction: enterRaffle} = useWeb3Contract({
      abi,
      contractAddress: raffleAddress,
      functionName: "enterRaffle",
      params: {},
      msgValue: entranceFee
   })
   
   const {runContractFunction: getEntranceFee} = useWeb3Contract({
      abi,
      contractAddress: raffleAddress,
      functionName: "getEntranceFee",
      params: {}
   })
   const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
      abi,
      contractAddress: raffleAddress,
      functionName: "getNumberOfPlayers",
      params: {}
   })
   const {runContractFunction: getRecentWinner} = useWeb3Contract({
      abi,
      contractAddress: raffleAddress,
      functionName: "getRecentWinner",
      params: {}
   })

   const handleSuccess = async (tx) =>{
      await tx.wait(1)
      handleNewNotification(tx)
      updateUI()
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

   const updateUI =  async()=>{
      seEntranceFee((await getEntranceFee()).toString())
      setNumPlayers((await getNumberOfPlayers()).toString())
      setRecentWinner((await getRecentWinner()).toString())
   }
   useEffect(()=>{
      if(isWeb3Enabled){
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
               Entrance Fee {ethers.utils.formatUnits(entranceFee, "ether")} ETH
               Players: {numPlayers}
               Recent Winner: {recentWinner}
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