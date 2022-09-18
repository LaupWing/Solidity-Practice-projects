import { ethers } from "ethers"
import React, { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { Modal, Input, useNotification } from "web3uikit"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"

const UpdateListingModal = ({
   nftAddress, 
   tokenId, 
   isVisible, 
   nftMarketplaceAddress,
   onClose
}) => {
   const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)
   const dispatch = useNotification()

   const handleUpdateListingSuccess = async (tx)=>{
      await tx.wait(1)
      dispatch({
         type: "success",
         message: "Listing updated",
         title: "Listing updated - please refresh (and move blocks)",
         position: "topR"
      })
      onClose && onClose()
      setPriceToUpdateListingWith(0)
   }

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
         onCancel={onClose}
         onCloseButtonPressed={onClose}
         onOk={()=>{
            updateListing({
               onError: error => console.error(error),
               onSuccess: ()=> handleUpdateListingSuccess()
            })
         }}
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