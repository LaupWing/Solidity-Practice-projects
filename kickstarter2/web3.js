import { ethers, providers } from 'ethers'

export const getSigner = ()=>{
   let signer = null
   
   let provider
   if(window){
      provider = new ethers.providers.Web3Provider(window.ethereum)
   }else{
      provider = new providers.JsonRpcProvider('http://localhost:8545/')
   }
   signer = provider.getSigner()
} 