import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAccount, useConnectUI, useWallet } from '@fuels/react';
import { bn } from 'fuels';

function App() {
  
const { connect, isConnecting } = useConnectUI();
const { account } = useAccount()
const { wallet } = useWallet()

  return (
    <>
      <button onClick={connect}>
        {isConnecting ? 'Connecting...' : wallet ? wallet?.address.toHexString() : 'Connect'}
      </button>
      <br></br>
      <br></br>
      <button onClick={async () => {
        const tx = await wallet?.createTransfer("0x5fa5be6d93d39b07a2921b7eb8572ae12e2dc937fe83a0f182b5d78679e78393", bn(100));
        if (!tx) {
          return
        }
        const signedTransaction = await wallet?.signTransaction(tx);
        // The above will give the error
        console.log(signedTransaction);
      }}>Sign Transaction</button>

    </>
  )
}

export default App
