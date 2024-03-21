import { useState } from 'react'
import './App.css'
import TokenTransferForm from './components/TokenTransferForm'
import ProgressBar from './components/ProgressBar';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [submitted, setSubmitted] = useState(null);
  let query = useQuery();
  let tokenAddress = query.get('token');
  let userAddress = query.get('user');
  let customText = query.get('text');
  console.log(tokenAddress, userAddress, customText);

  return (
    <>
      {!tokenAddress && !submitted && <TokenTransferForm setSubmitted={setSubmitted} />}
      {!tokenAddress && submitted && <ProgressBar
        token={submitted.tokenAddress}
        user={submitted.userAddress}
        textt={submitted.customText} />}
      {tokenAddress && <ProgressBar token={tokenAddress} user={userAddress} textt={customText} />}
    </>

  )
}

export default App
