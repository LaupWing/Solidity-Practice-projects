import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'

const CampaignCard = ({address}) => {
   const {signer} = useSelector(state => state.web3)

   useEffect(()=>{
      const getCampaign = async ()=>{
         const contract = new ethers.Contract(address, CampaignAbi.abi, signer)
         const name = await contract.name()
         console.log(name)
      }
      getCampaign()
   },[])

   return (
      <div>CampaignCard</div>
   )
}

export default CampaignCard