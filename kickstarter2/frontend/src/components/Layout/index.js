import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeb3 } from '../../features/web3Slice'

const Layout = ({children}) => {
   const dispatch = useDispatch()
   const contract = useSelector(state => state.web3.contract)
   console.log(contract)

   if(contract){
      const fetchTest = async ()=>{
         const name = await contract.getDeployedCampaigns()
         console.log(name)
      }
      fetchTest()
   }

   const web3Handler = async () =>{
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })

      window.ethereum.on('accountsChanged', ()=>{
         dispatch(fetchWeb3())
      })
      dispatch(fetchWeb3())
   }

   useEffect(()=>{
      web3Handler()
   },[])


   return (
      <div>
         {children}
      </div>
   )
}

export default Layout