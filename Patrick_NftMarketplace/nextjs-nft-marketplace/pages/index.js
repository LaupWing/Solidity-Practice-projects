import { useMoralisQuery } from 'react-moralis'
import styles from '../styles/Home.module.css'

export default function Home() {
   const {data: listedNfts, isFetching: fetchingListedNfts} = useMoralisQuery(
      "ActiveItem",
      (query) => query.limit(10).descending("tokenId")
   )

   return (
      <div className={styles.container}>
         {fetchingListedNfts ?  
            (<div>Loading...</div>) : 
            listedNfts.map((nft) => {
               console.log(nft.attributes)
               const {price, nftAddress, tokenId, marketplaceAddress, seller} = nft.attributes
               return (
                  <div>Price: {price}. NftAddress: {nftAddress}. TokenId: {tokenId}. Seller: {seller}</div>
               )
            })}     
      </div>
   )
}
