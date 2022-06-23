import { useEffect } from 'react'
import {useSelector} from 'react-redux'

export default function Home() {
   const {contract} = useSelector(state => state.web3)

   useEffect(()=>{
      const test = async ()=>{
         const _t = await contract.getDeployedCampaigns()
         console.log(_t)
      }
      test()
   },[])


   return (
      <main className="p-4">
         <h2>Create Campaign</h2>
      </main>
   )
}
