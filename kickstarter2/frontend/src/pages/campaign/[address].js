import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CampaignAbi from '../../../contractsData/campaign.json'
import {ethers} from 'ethers'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import CreateRequest from '../../components/Campaign/CreateRequest'
import CampaignHeader from '../../components/Campaign/Header.js'
import CampaingRequests from '../../components/Campaign/Requests'

const CampaignDetail = () => {
   const router = useRouter()
   const {address} = router.query
   const {signer, account} = useSelector(state=>state.web3)

   const [owner, setOwner] = useState(false)
   const [contributors, setContributors] = useState(null)
   const [alreadyContributed, setAlreadyContributed] = useState(false)
   const [contract, setContract] = useState(null)
   const [minimum, setMinimum] = useState(false)
   const [balance, setBalance] = useState(false)
   const [requests, setRequests] = useState([])
   const [name, setName] = useState('')
   const [goal, setGoal] = useState('')
   const [thumbnail, setThumbnail] = useState('')
   const [manager, setManager] = useState('')
   const [description, setDescription] = useState('')

   const [initialLoading, setInitialLoading] = useState(true)
   const [loading, setLoading] = useState(false)
   const [showCreateRequest, setShowCreateRequest] = useState(false)

   const fetchInfo = async ()=>{
      const manager = await contract.manager()
      
      await getRequests()
      
      const [
         _minimum,
         _goal,
         _balance,
         _manager,
         _thumbnail,
         _description,
         _name
      ] = await contract.summary()
      
      setAlreadyContributed(await contract.approvers(account))
      setOwner(ethers.utils.getAddress(account) === ethers.utils.getAddress(manager))
      setContributors((await contract.approversCount()).toString())
      setDescription(_description)
      setGoal(Number(ethers.utils.formatEther(_goal)))
      setBalance(Number(ethers.utils.formatEther(_balance)))
      setThumbnail(_thumbnail)
      setManager(_manager)
      setName(_name)
      setMinimum(Number(ethers.utils.formatEther(_minimum.toString())))
      setInitialLoading(false)
   }
   
   const getRequests = async ()=>{
      const request_count = await contract.getRequestsCount()
      setRequests([])
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
         value: Number(ethers.utils.formatEther(x.value))
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
   const denyRequest = async (index) =>{
      setLoading(true)
      const transation = await contract.denyRequest(index)
      await transation.wait()
      await fetchInfo()
      setLoading(false)
   }

   const sendRequest = async (index) =>{
      setLoading(true)
      const transation = await contract.finalizeRequest(index)
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
         <div className='max-w-5xl mx-auto w-full flex flex-col'>
            <button 
               className='btn-hollow my-3 mr-auto'
               onClick={()=>router.push('/')}
            >
               back
            </button>
            <div className='relative p-3 flex flex-col w-full mb-10'>
               {loading && <div className='absolute inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center z-50'>
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
                  description={description}
                  thumbnail={thumbnail}
                  goal={goal}
                  balance={balance}
                  manager={manager}
                  contributors={contributors}
                  show_contribute={!owner && !alreadyContributed}
                  contribute={contribute}
               />
               <h2 className='text-2xl my-5 w-full flex items-end'>
                  Requests
                  { owner &&
                     <button 
                        className='ml-3 btn bg-green-500'
                        onClick={()=>setShowCreateRequest(true)}
                     >
                        Create Request
                     </button>
                  }
               </h2>
               {(owner || alreadyContributed) ? <CampaingRequests 
                  requests={requests}
                  owner={owner}
                  approveRequest={approveRequest}
                  sendRequest={sendRequest}
                  denyRequest={denyRequest}
                  contributors={contributors}
                  contract={contract}
               /> : <h3>You have to contribute to view the requests</h3>}
            </div>
         </div>
   )
}

export default CampaignDetail