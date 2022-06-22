import React from 'react'

const Layout = ({children}) => {

   const web3Handler = async () =>{
      // const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      
      window.ethereum.on('chainChanged', ()=>{
         window.location.reload()
      })

      window.ethereum.on('accountsChanged', ()=>{
         web3Handler()
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      loadContract(signer)
   }
   const loadContract = async (signer) =>{
      const _contract = new ethers.Contract( CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
      const test = await _contract.getDeployedCampaigns()
      console.log(test)
   }

   useEffect(()=>{
      web3Handler()
   },[])
   return (
      <div>{children}</div>
   )
}

export default Layout