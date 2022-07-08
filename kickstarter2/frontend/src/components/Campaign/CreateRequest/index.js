import React, { useState } from 'react'
import Modal from 'react-modal'
import {MdOutlineClose} from 'react-icons/md'
import ReactLoading from 'react-loading'
import {ethers} from 'ethers'

const CreateRequest = ({createRequest, setShowCreateRequest, getRequests}) => {
   const [name, setName] = useState('')
   const [address, setAddress] = useState('')
   const [value, setValue] = useState('')
   const [description, setDescription] = useState('')
   const [loading, setLoading] = useState(false)

   const handleSubmit = async e =>{
      e.preventDefault()
      setLoading(true)
      await createRequest({
         name,
         address,
         value: ethers.utils.parseEther(value).toString(),
         description,
      })
      await getRequests()
      setShowCreateRequest(false)
      setLoading(false)
   }

   return (
      <Modal
         className='max-w-lg flex-col flex my-4 p-2 rounded overflow-hidden bg-slate-500 m-auto w-full relative'
         ariaHideApp={false}
         isOpen={true}
      >
         {loading && <div className='inset-0 absolute bg-slate-500 bg-opacity-80 flex justify-center items-center'>
            <ReactLoading className='m-auto'/>
         </div>}
         <h2 className='text-slate-700 font-bold uppercase mb-2 flex'>
            Create request
            <MdOutlineClose 
               className='ml-auto hover:text-white cursor-pointer' 
               size={25}
               onClick={()=>setShowCreateRequest(false)}
            />
         </h2>
         <form 
            className='flex flex-col space-y-2'
            onSubmit={handleSubmit}
         >
            <input 
               type="text" 
               className='input'
               placeholder='Name'
               value={name}
               onChange={e=>setName(e.target.value)}
               />
            <input 
               type="text" 
               className='input'
               placeholder='Receipient address'
               value={address}
               onChange={e=>setAddress(e.target.value)}
               />
            <input 
               type="number" 
               className='input'
               placeholder='0'
               value={value}
               onChange={e=>setValue(e.target.value)}
               />
            <textarea 
               className='p-1 rounded'
               placeholder='Description'
               value={description}
               onChange={e=>setDescription(e.target.value)}
            ></textarea>
            <button className='btn'>Create</button>
         </form>
      </Modal>
   )
}

export default CreateRequest