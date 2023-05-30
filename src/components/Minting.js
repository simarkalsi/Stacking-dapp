import React, { useState } from 'react'
import { ethers } from 'ethers';
import contractAddress from '../json/Staking-address.json';
import contractABI from "../json/Staking.json";


export default function Minting() {

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');



  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };


  const mintTokens = async () => {
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Set signer
      const signer = provider.getSigner()

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress.address, contractABI.abi, signer);

      // Call the mintToken function
      const gasPrice = await provider.getGasPrice();
      const gasLimit = await contract.estimateGas.mintToken(amount, address);

      const transaction = await contract.mintToken(amount, address, {
        gasLimit: gasLimit,
        gasPrice: gasPrice,
      });
      // Wait for the transaction to be mined
      await transaction.wait();

      console.log('Tokens minted successfully!');
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };






  return (
    <>
      <div>


        <input type="number" name="amount" id="" placeholder='Enter Tokens' value={amount} onChange={handleAmountChange} />
        <input type="text" name="address" id="" value={address} placeholder='Enter address' onChange={handleAddressChange} />
        <button style={{margin:"10px"}} onClick={mintTokens}>Mint Tokens</button>


      </div>
    </>
  )
}
