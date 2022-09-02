import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader(){
   const {enableWeb3, account, isWeb3Enabled} = useMoralis()

   useEffect(()=>{
      if(isWeb3Enabled) return
      enableWeb3()
   },[isWeb3Enabled])

   return(
      <div>
         {account ? (<div>Connected to {account.slice(0,6)}...{account.slice(account.length -4)}!</div>) : (<button onClick={async ()=>{ 
            await enableWeb3()
            if(typeof window !== "undefined"){
               if(window.localStorage.getItem("connected")){
                  window.localStorage.setItem("connected", "inject")
               }
            }
         }}>
            Connect
         </button>)}
         
      </div>
   )
}