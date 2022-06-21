import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   contract: null,
   account: null,
   error: false
}

export const counterSlice = createSlice({
   name: 'web3',
   initialState,
   reducers: {
      setWeb3: (state)=>{
         const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
         // window.ethereum.on('chainChanged', ()=>{
         //    window.location.reload()
         // })
         // window.ethereum.on('accountsChanged', ()=>{
         //    web3Handler()
         // })

         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const signer = provider.getSigner()
         const contract = new ethers.Contract( CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
         
         state.account = accounts[0]
         state.contract = contract
      }
   },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer