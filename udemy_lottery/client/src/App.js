import { ethers } from 'ethers';
import { useState } from 'react';

function App() {
   const [loading, setLoading] = useState(false)
   const [account, setAccount] = useState(null)
   const [contract, setContract] = useState(null)

   return (
      <div>
         <h1>Lottery</h1>
      </div>
   );
}

export default App;
