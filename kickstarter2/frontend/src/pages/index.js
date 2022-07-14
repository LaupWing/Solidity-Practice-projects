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
      <main className="p-4 w-full max-w-5xl mx-auto space-y-4">
         <Link href={`/create-campaign`}>
            <button className='bg-indigo-600 btn'>Create</button>
         </Link>
         <div className='grid grid-cols-3 w-full gap-4'>
            {campaigns.map(c=>(
               <CampaignCard 
                  address={c}
                  key={c}
               />
            ))}
         </div>
      </main>
   )
}
