import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import CampaignCard from '../components/CampaignCard'

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
         <h2 className='uppercase text-sm font-bold text-slate-300 tracking-wider'>Total projects: {campaigns.length}</h2>
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
