import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import basicNftAbi from "../constants/BasicNft.json"

const NFTBox = ({price, nftAddress, seller, marketplaceAddress, seller}) => {
   const [imageURI, setImageURI] = useState("")
   const {isWeb3Enabled} = useMoralis()

   const {runContractFunction: getTokenURI} = useWeb3Contract({
      abi: basicNftAbi,
      contractAddress: nftAddress,
      functionName: "tokenURI",
      params:{
         tokenId
      }
   })

   const updateUI = async ()=>{
      const tokenUri = await getTokenURI()
   }

   useEffect(()=>{
      if(isWeb3Enabled){
         updateUI()
      }
   }, [isWeb3Enabled])

   return (
      <div>NFTBox</div>
   )
}

export default NFTBox