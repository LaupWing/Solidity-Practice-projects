import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   contract: null,
   account: null
}

export const counterSlice = createSlice({
   name: 'web3',
   initialState,
   reducers: {
      
   },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer