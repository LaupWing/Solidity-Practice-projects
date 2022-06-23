import React from 'react'
import {useSelector} from 'react-redux'

const Header = () => {
   const {account} = useSelector(state => state.web3)
   return (
      <header className='w-full flex p-2'>
         <p className=' text-xs ml-auto text-slate-400 font-bold'>{account}</p>
      </header>
   )
}

export default Header