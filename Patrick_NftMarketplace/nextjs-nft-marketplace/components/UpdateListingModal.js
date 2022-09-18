import React from "react"
import { Modal, Input } from "web3uikit"

const UpdateListingModal = ({nftAddress, tokenId, isVisible}) => {
   return (
      <Modal
         isVisible={isVisible}
      >
         <Input 
            label="Update listing price in L1 Currency (ETH)"
            name="New listing price"
            type="number"
         ></Input>
      </Modal>
   )
}

export default UpdateListingModal