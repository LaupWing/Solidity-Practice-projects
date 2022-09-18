import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import basicNftAbi from "../constants/BasicNft.json"
import Image from 'next/image'
import {} from "e"
import { Card } from 'web3uikit'
import { ethers } from 'ethers'

const NFTBox = ({price, nftAddress, seller, marketplaceAddress, seller}) => {
   const [imageURI, setImageURI] = useState("")
   const {isWeb3Enabled} = useMoralis()
   const [tokenName, setTokenName] = useState("")
   const [tokenDescription, setTokenDescription] = useState("")

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
      console.log(`The TokenURI is ${tokenUri}`)

      if(tokenUri){
         // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
         const requestURL = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/")
         const tokenURIResponse = await (await fetch(requestURL)).json()
         const imageURI = tokenURIResponse.image
         const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
         setImageURI(imageURIURL)
         setTokenName(tokenURIResponse.name)
         setTokenDescription(tokenURIResponse.description)
      }
   }

   useEffect(()=>{
      if(isWeb3Enabled){
         updateUI()
      }
   }, [isWeb3Enabled])

   return (
      <div>
         <div>
            {imageURI ? (
               <Card title={tokenName} description={tokenDescription}>
                  <div className="flex flex-col items-end gap-2 p-2">
                     <div>
                        #{tokenId}
                     </div>
                     <div className="italix text-sm">Owned by {seller}</div>
                     <Image 
                        loader={()=>imageURI}
                        src={imageURI}
                        width="200"
                        height={"200"}
                     />
                     <div>{ethers.utils.formatUnits(price, "ether")} ETH</div>
                  </div>
               </Card>
            ) : (
               <div>Loading</div>
            )}
         </div>
      </div>
   )
}

export default NFTBox