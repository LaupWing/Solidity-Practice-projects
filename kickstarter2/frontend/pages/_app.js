import { useState } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   const [account, setAccount] = useState(null)

   const web3Handler = async () =>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      setAccount(accounts[0])
   }
   return <Component {...pageProps} />
}

export default MyApp
