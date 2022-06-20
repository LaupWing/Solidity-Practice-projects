import { ethers, providers } from 'ethers'
import Head from 'next/head'
import Image from 'next/image'
import CampaignFactoryAbi from '../contractsData/campaignFactory.json'
import CampaignFactoryAddress from '../contractsData/campaignFactory-address.json'
import { useEffect } from 'react'


export default function Home(props) {
   useEffect(()=>{
      const test = async ()=>{
         console.log(props.contract.interface.functions)
         console.log(providers)
         // console.log(props.contract.interface.functions.)
         // const _test = await props.contract.getDeployedCampaigns()
         // console.log(_test)
      }
      test()
   },[])
   return (
      <div>
      </div>
   )
}

Home.getInitialProps = async()=>{
   const provider = new providers.JsonRpcProvider('http://localhost:8545/')
   // const provider2 = new providers.JsonRpcSigner('http://localhost:8545/')
   const signer = provider.getSigner()
   const contract = new ethers.Contract( CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
   return {
      contract: contract
   }
}
