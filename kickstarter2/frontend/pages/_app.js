import { useEffect, useState } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   const [account, setAccount] = useState(null)

   const web3Handler = async () =>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      setAccount(accounts[0])
      
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })

      window.ethereum.on('accountsChanged', ()=>{
         // setLoading(true)
         web3Handler()
      })
   }
   useEffect(()=>{
      web3Handler()
   },[])
   return <Component {...pageProps} />
}

export default MyApp
