import { configureStore } from '@reduxjs/toolkit'
import web3Slice from '../features/web3Slice'


export const store = configureStore({
   reducer: {
      web3: web3Slice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
})