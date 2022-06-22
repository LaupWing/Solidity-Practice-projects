import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import CampaignFactoryAbi from '../../contractsData/campaignFactory.json'
import CampaignFactoryAddress from '../../contractsData/campaignFactory-address.json'

const initialState = {
   contract: null,
   account: null,
   error: false
}


export const web3Slice = createSlice({
   name: 'web3',
   initialState,
   reducers: {
      setWeb3: (state, action) => {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const signer = provider.getSigner()
         const contract = new ethers.Contract(CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
         console.log(contract)
         state.contract = contract
         state.account = action.payload.account
      }
   }
})


export const { setWeb3 } = web3Slice.actions

export default web3Slice.reducer