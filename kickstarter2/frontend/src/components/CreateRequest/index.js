import React from 'react'
import Modal from 'react-modal'

const CreateRequest = () => {
   return (
      <Modal
         isOpen={true}
      >
         <input 
            type="text" 
            className='border border-slate-300 rounded'
         />
      </Modal>
   )
}

export default CreateRequest