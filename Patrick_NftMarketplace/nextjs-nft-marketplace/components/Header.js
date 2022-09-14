import Link from 'next/link'
import React from 'react'
import { ConnectButton } from 'web3uikit'

const Header = () => {
   return (
      <nav> 
         <Link href={"/"}>
            <a>NFT Marketplace</a>
         </Link>
         <Link href={"/sell-nft"}>
            <a>Sell NFT</a>
         </Link>
         <ConnectButton/>
      </nav>
   )
}

export default Header