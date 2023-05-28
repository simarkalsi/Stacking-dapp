import './App.css';
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Stacking from './components/Stacking';
import Minting from './components/Minting';
import Navbar from './components/Navbar';
import { ethers } from 'ethers';



function App() {

  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})


  const web3Handler = async () => {

    if (window.ethereum) {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Set signer
      const signer = provider.getSigner()
      loadContracts(signer)


    } else {
      alert("install metamask extension!!");
    }
  }

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const token = new ethers.Contract(contractAddress.address, contractABI.abi, signer);
    setContract(token);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar web3Handler={web3Handler} />


        <Routes>
          <Route path="/" element={
            <Stacking />
          } />
          <Route path="/minting" element={
            <Minting />
          } />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
