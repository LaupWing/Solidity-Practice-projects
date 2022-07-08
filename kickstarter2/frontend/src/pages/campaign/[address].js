import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import Contribute from '../../components/Campaign/Contribute'
import CreateRequest from '../../components/Campaign/CreateRequest'
import CampaignHeader from '../../components/Campaign/Header.js'
import CampaingRequests from '../../components/Campaign/Requests'

const CampaignDetail = () => {
   const router = useRouter()
   const {address} = router.query
   const {signer, account, provider} = useSelector(state=>state.web3)

   const [owner, setOwner] = useState(false)
   const [contributors, setContributors] = useState(null)
   const [alreadyContributed, setAlreadyContributed] = useState(false)
   const [contract, setContract] = useState(null)
   const [minimum, setMinimum] = useState(false)
   const [balance, setBalance] = useState(false)
   const [requests, setRequests] = useState([])
   const [name, setName] = useState('')

   const [initialLoading, setInitialLoading] = useState(true)
   const [loading, setLoading] = useState(false)
   const [showCreateRequest, setShowCreateRequest] = useState(false)

   const fetchInfo = async ()=>{
      const manager = await contract.manager()
      const _balance = await provider.getBalance(address)
      
      await getRequests()
      setBalance(_balance.toString())
      setAlreadyContributed(await contract.approvers(account))
      setContributors((await contract.approversCount()).toString())
      setName(await contract.name())
      setMinimum(ethers.utils.formatEther((await contract.minimum_contribution()).toString()))
      setOwner(ethers.utils.getAddress(account) === ethers.utils.getAddress(manager))
      setInitialLoading(false)
   }
   
   const getRequests = async ()=>{
      const request_count = await contract.getRequestsCount()
      const requests_proxy = await Promise.all(
         [...new Array(Number(request_count.toString()))]
         .map((_, i)=>{
            return contract.requests(i)
         })
      )

      setRequests(requests_proxy.map(x=>({
         approvalCount: x.approvalCount.toString(),
         complete: x.complete,
         description: x.description,
         recipient: x.recipient,
         title: x.title,
         value: x.value.toString()
      })))
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


   const contribute = async (contribution) =>{
      setLoading(true)
      const transation = await contract.contribute({value: contribution})
      await transation.wait()
      await fetchInfo()
      setLoading(false)
   }
   
   const approveRequest = async (index) =>{
      setLoading(true)
      const transation = await contract.approveRequest(index)
      await transation.wait()
      await fetchInfo()
      setLoading(false)
   }

   useEffect(()=>{
      if(!contract){
         setContract(new ethers.Contract(address, CampaignAbi.abi, signer))
      }else{
         fetchInfo()
      }
   },[contract])

   return (
      initialLoading ? 
         <ReactLoading className='m-auto'/> : 
         <div className='max-w-3xl mx-auto w-full flex flex-col'>
            <button 
               className='btn mb-4'
               onClick={()=>router.push('/')}
            >
               back
            </button>
            <div className='relative p-3 flex flex-col w-full bg-white shadow rounded'>
               {loading && <div className='absolute inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center'>
                  <ReactLoading/>
               </div>}
               {showCreateRequest && <CreateRequest
                  createRequest={createRequest}
                  setShowCreateRequest={setShowCreateRequest}
                  getRequests={getRequests}
               />}
               <CampaignHeader
                  name={name}
                  minimum={minimum}
                  balance={balance}
                  contributors={contributors}
               />
               { owner ? 
                  <button 
                     className='my-4 rounded bg-green-500 mr-auto px-4 text-xs uppercase text-white font-bold py-1'
                     onClick={()=>setShowCreateRequest(true)}
                  >
                     Create Request
                  </button> :
                  (alreadyContributed ? null : <Contribute
                     contribute={contribute}
                     minimum={minimum}
                  />)
               }
               <CampaingRequests 
                  requests={requests}
                  owner={owner}
                  approveRequest={approveRequest}
                  contributors={contributors}
               />
            </div>
         </div>
   )
}

export default CampaignDetail