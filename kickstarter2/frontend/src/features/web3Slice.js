import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
   contract: null,
   account: null,
   error: false
}

const fetchWeb3 = createAsyncThunk(
   'web3/fetchWeb3Status',
   async ()=>{
      const accounts = window.ethereum.request({method: 'eth_requestAccounts'})
      // window.ethereum.on('chainChanged', ()=>{
      //    window.location.reload()
      // })
      // window.ethereum.on('accountsChanged', ()=>{
      //    web3Handler()
      // })
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract( CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
      
      return {
         account: accounts[0],
         contract
      }
   }
)


export const web3Slice= createSlice({
   name: 'web3',
   initialState,
   reducers: {
      
   },
   extraReducers: (builder) =>{
      builder.addCase(fetchWeb3.fulfilled, (state, {payload})=>{
         state.contract = payload.contract
         state.account = payload.account
      }),
      builder.addCase(fetchWeb3.rejected, (state)=>{
         state.error = 'Failed to fetch web3'
      })
   }
})


// export const { setWeb3 } = web3Slice.actions

export default web3Slice.reducer