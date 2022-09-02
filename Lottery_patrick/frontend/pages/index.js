import Head from 'next/head'
import Header from '../components/Header'
// import ManualHeader from '../components/ManualHeader'
import styles from '../styles/Home.module.css'

export default function Home() {
   return (
      <div className={styles.container}>
         <Head>
            <title>Smart Contract Lottery</title>
            <meta name="description" content="Our smart contract lottery" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         {/* <ManualHeader/> */}
         <Header/>
      </div>
   )
}
