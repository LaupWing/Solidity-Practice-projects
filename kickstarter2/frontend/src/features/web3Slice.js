import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import CampaignFactoryAbi from '../../contractsData/campaignFactory.json'
import CampaignFactoryAddress from '../../contractsData/campaignFactory-address.json'

const initialState = {
   contract: null,
   account: null,
   provider: null,
   error: false,
   signer: null
}


export const fetchWeb3 = createAsyncThunk(
   'web3/fetchWeb3Status',
   async ()=>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)

      return {
         account: accounts[0],
         contract,
         signer,
         provider
      }
   }
)


export const web3Slice = createSlice({
   name: 'web3',
   initialState,
   reducers: {
   },
   extraReducers: builder =>{
      builder
         .addCase(fetchWeb3.fulfilled, (state, action)=>{
            state.account = action.payload.account
            state.contract = action.payload.contract
            state.provider = action.payload.provider
            state.signer = action.payload.signer          
         })
   }
})

export default web3Slice.reducer