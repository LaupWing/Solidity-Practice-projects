import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import Contribute from '../../components/Contribute'
import CreateRequest from '../../components/CreateRequest'

const CampaignDetail = () => {
   const router = useRouter()
   const {address} = router.query
   const {signer, account} = useSelector(state=>state.web3)
   const [owner, setOwner] = useState(false)
   const [alreadyContributed, setAlreadyContributed] = useState(false)
   const [contract, setContract] = useState(null)
   const [minimum, setMinimum] = useState(false)
   const [name, setName] = useState('')
   const [loading, setLoading] = useState(true)

   const fetchContract = async ()=>{
      const _contract = new ethers.Contract(address, CampaignAbi.abi, signer)
      const manager = await _contract.manager()
      const request_count = await _contract.getRequestsCount()
      const requests_proxy = await Promise.all([new Array(Number(request_count.toString()))]
         .map((_, i)=>_contract.requests(i)))
      const requests = requests_proxy.map(x=>({
         approvalCount: x.approvalCount.toString(),
         complete: x.complete,
         description: x.description,
         recipient: x.recipient,
         title: x.title,
         value: x.value.toString()
      }))
      console.log(requests)
      // console.log(request_count.toString())
      // console.log(requests_proxy)
      setAlreadyContributed(await _contract.approvers(account))
      setContract(_contract)
      setName(await _contract.name())
      setMinimum((await _contract.minimum_contribution()).toString())
      setOwner(ethers.utils.getAddress(account) === ethers.utils.getAddress(manager))
      setLoading(false)
   }

   const createRequest = async (request) =>{
      const transation = await contract.createRequest(
         request.name,
         request.description,
         request.value,
         request.address
      )
      await transation.wait()
   }

   useEffect(()=>{
      fetchContract()
   },[])

   return (
      loading ? 
         <ReactLoading className='m-auto'/> : 
         <div className='p-3 flex flex-col'>
            {/* <CreateRequest
               createRequest={createRequest}
            /> */}
            <h2 className='font-bold text-slate-400 flex'>
               {name}
               <span className='ml-auto text-slate-600'>{minimum}</span>
            </h2>
            { owner ? 
               <button 
                  className='my-4 rounded bg-green-500 mr-auto px-4 text-xs uppercase text-white font-bold py-1'
               >
                  Create Request
               </button> :
               (alreadyContributed ? null : <Contribute
                  contract={contract}
                  minimum={minimum}
               />)
            }
         </div>
   )
}

export default CampaignDetail