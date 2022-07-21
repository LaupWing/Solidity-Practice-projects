import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeb3 } from '../../features/web3Slice'
import ReactLoading from 'react-loading'
import {useSelector} from 'react-redux'
import Header from './Header'

const Layout = ({children}) => {
   const dispatch = useDispatch()
   const {contract} = useSelector(state => state.web3)

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
      <div className='bg-white w-full h-screen flex flex-col'>
         <Header/>
         {contract ? children :(
            <ReactLoading className='m-auto'/>
         )}
      </div>
   )
}

export default Layout