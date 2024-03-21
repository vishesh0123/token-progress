import { useState } from 'react'
import './App.css'
import TokenTransferForm from './components/TokenTransferForm'
import ProgressBar from './components/ProgressBar';

function App() {
  const [submitted, setSubmitted] = useState(null);

  return (
    <>
      {!submitted && <TokenTransferForm setSubmitted={setSubmitted} />}
      {submitted && <ProgressBar
        token={submitted.tokenAddress}
        user={submitted.userAddress}
        textt={submitted.customText} />}
    </>

  )
}

export default App
