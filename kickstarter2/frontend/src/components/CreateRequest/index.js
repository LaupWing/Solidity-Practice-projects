import React from 'react'
import Modal from 'react-modal'

const CreateRequest = () => {
   return (
      <Modal
         className='max-w-lg flex-col flex my-4 p-2 rounded bg-slate-500 m-auto w-full'
         isOpen={true}
      >
         <h2 className='text-slate-700 font-bold uppercase mb-2'>Create request</h2>
         <input 
            type="text" 
            className='border border-slate-300 rounded'
         />
      </Modal>
   )
}

export default CreateRequest