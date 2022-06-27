import React from 'react'
import Modal from 'react-modal'


// string memory _title,
// string memory _description, 
// uint _value, 
// address _recipient
const CreateRequest = () => {
   return (
      <Modal
         className='max-w-lg flex-col flex my-4 p-2 rounded bg-slate-500 m-auto w-full'
         isOpen={true}
      >
         <h2 className='text-slate-700 font-bold uppercase mb-2'>Create request</h2>
         <main className='flex flex-col space-y-2'>
            <input 
               type="text" 
               className='input'
               placeholder='Name'
            />
            <input 
               type="text" 
               className='input'
               placeholder='Receipient address'
            />
            <input 
               type="number" 
               className='input'
               placeholder='0'
            />
            <textarea 
               className='p-1 rounded'
               placeholder='Description'
            ></textarea>
            <button className='btn'>Create</button>
         </main>
      </Modal>
   )
}

export default CreateRequest