import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import {useSelector} from 'react-redux'
import { useRouter } from 'next/router'

const CreateCampaign = () => {
   const [name, setName] = useState('')
   const [minimum, setMinimum] = useState(0)
   const [loading, setLoading] = useState(false)
   const {contract} = useSelector(state => state.web3)
   const router = useRouter()

   const handleSubmit = async e =>{
      e.preventDefault()
      setLoading(true)
      try{
         const transaction = await contract.createCampaign(name, minimum)
         await transaction.wait()
         setName('')
         setMinimum(0)
         router.push('/')

      }catch(e){
         console.log(e.message)
      }
      setLoading(false)
   }

   return (
      <main className='w-full p-4 max-w-2xl mx-auto'>
         <form 
            className='w-full p-2 bg-white overflow-hidden rounded shadow flex flex-col relative'
            onSubmit={handleSubmit}
         >
            {loading && <div className='absolute bg-black bg-opacity-80 flex inset-0 justify-center items-center'>
               <ReactLoading/>
            </div>}
            <h2 className='text-slate-600 uppercase font-bold text-sm tracking-wider'>Create campaign</h2>
            <div className='w-full flex my-2'>
               <input 
                  type="text"  
                  className='input'
                  placeholder='Campaign Name'
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  required
               />
               <input 
                  type="number" 
                  className='focus:outline-none border ml-1 w-24 px-2 border-slate-400 rounded' 
                  placeholder='1'
                  value={minimum}
                  onChange={e=>setMinimum(e.target.value)}
                  required
               />
            </div>
            <button className='mx-auto my-2 bg-green-500 rounded uppercase text-xs tracking-wider font-bold text-white px-3 py-1'>Create</button>
         </form>
      </main>
   )
}

export default CreateCampaign