import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import {useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import {ethers} from 'ethers'
import {create as ipfsHttpClient} from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const CreateCampaign = () => {
   const [name, setName] = useState('')
   const [minimum, setMinimum] = useState('')
   const [description, setDescription] = useState('')
   const [loading, setLoading] = useState(false)
   const [buffer, setBuffer] = useState(false)
   const [preview, setPreview] = useState(false)
   const {contract} = useSelector(state => state.web3)
   const router = useRouter()

   const handleSubmit = async e =>{
      e.preventDefault()
      setLoading(true)
      try{
         const image = await client.add(buffer) 
         
         const transaction = await contract.createCampaign(
            name, 
            ethers.utils.parseEther(minimum).toString(),
            description,
            image.path
         )
         await transaction.wait()
         setName('')
         setBuffer(false)
         setPreview(false)
         setMinimum(0)
         router.push('/')

      }catch(e){
         console.log(e.message)
      }
      setLoading(false)
   }

   const handleFile = e =>{
      const {files} = e.target
      const file = files[0]
      const validImageTypes = ['image/jpeg', 'image/png']
      if(validImageTypes.includes(file.type)){
         setPreview(URL.createObjectURL(file))
         const reader = new window.FileReader()
         reader.readAsArrayBuffer(file)
   
         reader.onloadend = () =>{
            setBuffer(Buffer(reader.result))
         }
      }
   }

   return (
      <main className='w-full p-4 max-w-2xl mx-auto'>
         <button 
            className='btn-hollow mb-4'
            onClick={()=> router.push('/')}
         >
            Back
         </button>
         <form 
            className='w-full p-2 bg-slate-50 border border-slate-300 overflow-hidden rounded  flex flex-col relative'
            onSubmit={handleSubmit}
         >
            {loading && <div className='absolute bg-black bg-opacity-80 flex inset-0 justify-center items-center'>
               <ReactLoading/>
            </div>}
            <h2 className='text-slate-600 uppercase font-bold text-sm tracking-wider'>Create campaign</h2>
            <div className='my-2'>
               <div className='w-full flex'>
                  <input 
                     type="text"  
                     className='input flex-1'
                     placeholder='Campaign Name'
                     value={name}
                     onChange={e=>setName(e.target.value)}
                     required
                  />
               </div>
               <div className='w-full flex my-2'>
                  <input 
                     type="number" 
                     className='input flex-1' 
                     placeholder='ETH goal'
                     value={minimum}
                     onChange={e=>setMinimum(e.target.value)}
                     required
                  />
                  <input 
                     type="number" 
                     className='input ml-1 flex-1' 
                     placeholder='ETH minimum'
                     value={minimum}
                     onChange={e=>setMinimum(e.target.value)}
                     required
                  />
               </div>
               <div className='h-40 flex items-center'>
                  {!preview ? <input 
                     type="file" 
                     onChange={handleFile}
                  /> : <img 
                     src={preview}
                     className='h-full object-cover w-40'
                  />
                  }
                  <textarea 
                     className='h-full rounded p-2 focus:outline-none bg-slate-200 w-full resize-none ml-2'
                     placeholder='Description'
                     onChange={e=>setDescription(e.target.value)}
                  ></textarea>
               </div>
            </div>
            <button className='btn bg-indigo-500 ml-auto mt-2'>Create</button>
         </form>
      </main>
   )
}

export default CreateCampaign