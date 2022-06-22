import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   contract: null,
   account: null,
   error: false
}


export const web3Slice = createSlice({
   name: 'web3',
   initialState,
   reducers: {
      setWeb3: (state, action) =>{
         state.contract = action.payload.contract
         state.account = action.payload.account
      }
   }
})


export const { setWeb3 } = web3Slice.actions

export default web3Slice.reducer