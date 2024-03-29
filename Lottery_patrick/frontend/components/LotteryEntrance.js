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

   const {runContractFunction: enterRaffle, isFetching, isLoading} = useWeb3Contract({
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
      <div className='p-5'>
         Hi from Lottery
         {raffleAddress ? (
            <div>
               <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                  onClick={async ()=>{
                     await enterRaffle({
                        onSuccess: handleSuccess,
                        onError: (error) =>{ console.log(error)}
                     })
                  }}
                  disabled={isLoading || isFetching}
               >
                  Enter Raffle
                  {isFetching || isLoading ? (
                     <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                  ) :( 
                     <div>Enter Raffle</div>
                  )}
               </button>

               <div>Entrance Fee {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
               <div>Players: {numPlayers}</div>
               <div>Recent Winner: {recentWinner}</div>
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