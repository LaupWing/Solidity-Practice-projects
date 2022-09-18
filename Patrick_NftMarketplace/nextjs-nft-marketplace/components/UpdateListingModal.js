import { ethers } from "ethers"
import React, { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { Modal, Input } from "web3uikit"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"

const UpdateListingModal = ({nftAddress, tokenId, isVisible, nftMarketplaceAddress}) => {
   const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)

   const {runContractFunction: updateListing} = useWeb3Contract({
      abi: nftMarketplaceAbi,
      contractAddress: nftMarketplaceAddress,
      functionName: "updateListing",
      params: {
         nftAddress,
         tokenId,
         newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0")
      }
   })

   return (
      <Modal
         isVisible={isVisible}
      >
         <Input 
            label="Update listing price in L1 Currency (ETH)"
            name="New listing price"
            type="number"
            onChange={event => {
               setPriceToUpdateListingWith(event.target.value)
            }}
         />
      </Modal>
   )
}

export default UpdateListingModal