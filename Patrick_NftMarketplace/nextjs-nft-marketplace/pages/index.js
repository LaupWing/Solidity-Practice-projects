import { useMoralisQuery } from 'react-moralis'
import NFTBox from '../components/NFTBox'
import styles from '../styles/Home.module.css'

export default function Home() {
   const {data: listedNfts, isFetching: fetchingListedNfts} = useMoralisQuery(
      "ActiveItem",
      (query) => query.limit(10).descending("tokenId")
   )

   return (
      <div className="container mx-auto">
         <h1 className="p-4 font-bold text-2xl">Recently Listed</h1>
         <div className="flex flex-wrap">
            {fetchingListedNfts ?  
               (<div>Loading...</div>) : 
               listedNfts.map((nft) => {
                  console.log(nft.attributes)
                  const {price, nftAddress, tokenId, marketplaceAddress, seller} = nft.attributes
                  return (
                     <div>
                        <NFTBox
                           price={price}
                           nftAddress={nftAddress}
                           marketplaceAddress={marketplaceAddress}
                           seller={seller}
                        />
                     </div>
                  )
               })}     
         </div>
      </div>
   )
}
