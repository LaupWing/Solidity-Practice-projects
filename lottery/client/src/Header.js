import React from 'react'

const Header = ({account}) => {
   return (
      <header className='w-full p-2 bg-yellow-400 flex items-center'>
         <h1 className='font-bold text-yellow-100 uppercase text-xs tracking-wider'>Lottery</h1>
         <p className='ml-2 text-gray-400 text-xs font-bold'>{account ? account : '0x0'}</p>
      </header>
   )
}

export default Header