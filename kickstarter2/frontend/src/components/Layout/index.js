import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeb3 } from '../../features/web3Slice'
import ReactLoading from 'react-loading'
import {useSelector} from 'react-redux'
import Header from './Header'
import { ethers } from 'ethers'
import { useState } from 'react'

const Layout = ({children}) => {
   const dispatch = useDispatch()
   const {contract} = useSelector(state => state.web3)
   const [loggedIn, setLoggedIn] = useState(false)

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
         {loggedIn ? (<>
            <Header/>
            {contract ? children :(
               <ReactLoading className='m-auto'/>
            )}
         </>) : (
            <div className='flex flex-col flex-1 items-center justify-center'>
               <p className='text-slate-300 uppercase text-sm font-bold'>You need metamask to use this website</p>
               <button className="btn bg-indigo-500 mt-4">Login Metamask</button>
            </div>
         )}
      </div>
   )
}

export default Layout