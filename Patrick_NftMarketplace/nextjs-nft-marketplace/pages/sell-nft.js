import Head from 'next/head'
import Image from 'next/image'
import { Form } from 'web3uikit'
import styles from '../styles/Home.module.css'

export default function Home() {
   return (
      <div className={styles.container}>
         <Form
            data={[
               {
                  name: "NFT Address",
                  type: "text",
                  inputWidth: "50%",
                  value: "",
                  key: "nftAddress"
               },
               {
                  name: "Token ID",
                  type: "number",
                  value: "",
                  key: "tokenId"
               },
               {
                  name: "Price (in ETH)",
                  type: "number",
                  value: "",
                  key: "price"
               },
            ]}
            title="Sell your NFT!"
         />
      </div>
   )
}
