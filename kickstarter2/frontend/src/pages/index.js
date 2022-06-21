import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeb3 } from '../features/web3Slice'


export default function Home(props) {
   const dispatch = useDispatch()

   useEffect(()=>{
      dispatch(fetchWeb3())   
   },[])
   return (
      <div>
      </div>
   )
}
