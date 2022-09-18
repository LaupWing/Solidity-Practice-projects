import React, { useState } from 'react'
import { useWeb3Contract } from 'react-moralis'

const NFTBox = ({price, nftAddress, seller, marketplaceAddress, seller}) => {
   const [imageURI, setImageURI] = useState("")

   const {runContractFunction: getTokenURI} = useWeb3Contract({
      abi
   })

   const updateUI = async ()=>{

   }

   return (
      <div>NFTBox</div>
   )
}

export default NFTBox