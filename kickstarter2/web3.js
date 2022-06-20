const web3Handler = async () =>{
   const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
   setAccount(accounts[0])
   
   window.ethereum.on('chainChanged', ()=>{
      window.location.reload()
   })

   window.ethereum.on('accountsChanged', ()=>{
      // setLoading(true)
      web3Handler()
   })

   const provider = new ethers.providers.Web3Provider(window.ethereum)
   const test0 = new providers.JsonRpcProvider('http://localhost:8545/')
   console.log(window.ethereum)
   const signer = provider.getSigner()
   console.log(test0.getSigner())
   console.log(signer)
   loadContract(signer)
}
const loadContract = async (signer) =>{
   const _contract = new ethers.Contract( CampaignFactoryAddress.address, CampaignFactoryAbi.abi, signer)
   const test = await _contract.getDeployedCampaigns()
   console.log(test)
   console.log(_contract)
   setContract(_contract)
}