import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeb3 } from '../../features/web3Slice'
import ReactLoading from 'react-loading'
import {useSelector} from 'react-redux'
import Header from './Header'
import { ethers } from 'ethers'

const Layout = ({children}) => {
   const dispatch = useDispatch()
   const {contract} = useSelector(state => state.web3)

   const initialize = async ()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()
      if(accounts.length > 0){
         dispatch(fetchWeb3())
      }
   }
   useEffect(()=>{
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })
   
      window.ethereum.on('accountsChanged', ()=>{
         window.location.reload()
      })
      initialize()
   },[])


   return (
      <div className='bg-white w-full h-screen flex flex-col'>
         <Header/>
         {contract ? children :(
            <ReactLoading className='m-auto'/>
         )}
      </div>
   )
}

export default Layout