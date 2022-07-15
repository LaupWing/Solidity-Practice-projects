import React from 'react'
import {useSelector} from 'react-redux'

const Header = () => {
   const {account} = useSelector(state => state.web3)
   return (
      <header className='w-full flex items-center px-6 py-4 border-b border-slate-200'>
         <nav className='basis-1/3 flex'>
            <p>Discover</p>
            <p>Create</p>
         </nav>
         <h1 className='uppercase font-bold basis-1/3 text-center'>kickstarter</h1>
         <p className='basis-1/3 text-xs text-right ml-auto text-slate-400 font-bold'>{account}</p>
      </header>
   )
}

export default Header