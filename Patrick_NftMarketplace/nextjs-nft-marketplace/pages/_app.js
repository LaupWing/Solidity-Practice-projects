import Head from 'next/head'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'
import Header from '../components/Header'
import '../styles/globals.css'

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            <title>NFT Marketplace</title>
            <meta name="description" content="NFT Marketplace" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <MoralisProvider 
            appId={APP_ID} 
            serverUrl={SERVER_URL}
         >
            <NotificationProvider>
               <Header/>
               <Component {...pageProps} />
            </NotificationProvider>
         </MoralisProvider>
      </>
   )
  
}

export default MyApp
