import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeb3 } from '../../features/web3Slice'

const Layout = ({children}) => {
   const dispatch = useDispatch()

   useEffect(()=>{
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })
   
      window.ethereum.on('accountsChanged', ()=>{
         dispatch(fetchWeb3())
      })
      dispatch(fetchWeb3())
   },[])


   return (
      <div>
         {children}
      </div>
   )
}

export default Layout