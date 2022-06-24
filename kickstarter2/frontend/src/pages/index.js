import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import CampaignCard from '../components/CampaignCard'
import Link from 'next/link'

export default function Home() {
   const {contract} = useSelector(state => state.web3)
   const [campaigns, setCampaigns] = useState([])

   useEffect(()=>{
      const getCampaigns = async ()=>{
         const _campaigns = await contract.getDeployedCampaigns()
         setCampaigns(_campaigns)
         
      }
      getCampaigns()
   },[])


   return (
      <main className="p-4 w-full max-w-lg mx-auto space-y-4">
         <Link href={`/create-campaign`}>
            <button className='text-xs uppercase text-white bg-indigo-600 py-1 px-4 font-bold rounded'>Create</button>
         </Link>
         {campaigns.map(c=>(
            <CampaignCard 
               address={c}
               key={c}
            />
         ))}
      </main>
   )
}
