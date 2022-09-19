import { ethers } from 'ethers'
import Head from 'next/head'
import Image from 'next/image'
import { Form, useNotification } from 'web3uikit'
import styles from '../styles/Home.module.css'

import networkMapping from "../constants/networkMapping.json"
import basicNftAbi from "../constants/BasicNft.json"
import marketplaceAbi from "../constants/NftMarketplace.json"
import { useMoralis, useWeb3Contract } from 'react-moralis'

export default function Home() {
   const {chainId} = useMoralis()

   const chainString = chainId ? parseInt(chainId).toString() : "31337"
   const marketplaceAddress = networkMapping[chainId].NftMarketplace[0]
   const dispatch = useNotification()

   const {runContractFunction} = useWeb3Contract()

   const approveAndList = async (data)=>{
      console.log("Approving")

      const nftAddress = data.data[0].inputResult
      const tokenId = data.data[1].inputResult
      const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()

      const approveOptions = {
         abi:basicNftAbi,
         contractAddress: nftAddress,
         function: "approve",
         params:{
            to: marketplaceAddress,
            tokenId
         }
      }

      await runContractFunction({
         params: approveOptions,
         onSuccess: ()=>handleApproveSuccess(nftAddress, tokenId, price),
         onError: (error)=> console.error(error)
      })
   }

   const handleApproveSuccess = async (nftAddress, tokenId, price)=>{
      console.log("Ok! Now time to")
      const listOptions ={
         abi:marketplaceAbi,
         contractAddress: marketplaceAddress,
         function: "listItem",
         params:{
            nftAddress, 
            tokenId,
            price
         }
      }
      
      await runContractFunction({
         params: listOptions,
         onSuccess: ()=> handleListSuccess(),
         onError: error => console.error(error)
      })
   }

   const handleListSuccess = async () =>{
      dispatch({
         type: "success",
         message: "NFT listing",
         title: "NFT listed",
         position: "topR"
      })
   }

   return (
      <div className={styles.container}>
         <Form
            onSubmit={approveAndList}
            data={[
               {
                  name: "NFT Address",
                  type: "text",
                  inputWidth: "50%",
                  value: "",
                  key: "nftAddress"
               },
               {
                  name: "Token ID",
                  type: "number",
                  value: "",
                  key: "tokenId"
               },
               {
                  name: "Price (in ETH)",
                  type: "number",
                  value: "",
                  key: "price"
               },
            ]}
            title="Sell your NFT!"
         />
      </div>
   )
}
