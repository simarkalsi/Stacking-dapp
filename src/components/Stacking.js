import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import contractAddress from '../json/Staking-address.json';
import contractABI from "../json/Staking.json";


export default function Stacking() {
    
    const [amount, setAmount] = useState();
    const [rewardData, setRewardData] = useState(null);


    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const stakeHandler=async()=>{
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // Set signer
            const signer = provider.getSigner()
      
            // Create a contract instance
            const contract = new ethers.Contract(contractAddress.address, contractABI.abi, signer);
      
            // Call the stake function
            const gasPrice = await provider.getGasPrice();
            const gasLimit = await contract.estimateGas.stake(amount);
      
            const transaction = await contract.stake(amount, {
              gasLimit: gasLimit,
              gasPrice: gasPrice,
            });
            // Wait for the transaction to be mined
            await transaction.wait();
      
            console.log('Tokens Stake successfully!');
          } catch (error) {
            console.error('Error Staking tokens:', error);
          }
    }
    const UnstakeToken=async()=>{
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            // Set signer
            const signer = provider.getSigner()
      
            // Create a contract instance
            const contract = new ethers.Contract(contractAddress.address, contractABI.abi, signer);
      
            // Call the stake function
            const gasPrice = await provider.getGasPrice();
            const gasLimit = await contract.estimateGas.unstake();
      
            const transaction = await contract.unstake( {
              gasLimit: gasLimit,
              gasPrice: gasPrice,
            });
            // Wait for the transaction to be mined
            await transaction.wait();
      
            console.log('Tokens Stake successfully!');
          } catch (error) {
            console.error('Error Staking tokens:', error);
          }

       
    }

    useEffect(() => {
        // Create an Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner()
    
        // Create a contract instance
        const contract = new ethers.Contract(contractAddress.address, contractABI.abi, signer);
    
        // Function to fetch and update reward data
        const fetchRewardData = async () => {
          try {
    
            // Get the current account address
            const accounts = await provider.listAccounts();
            const account = accounts[0];
    
            // Call the calculateReward function
            const reward = await contract.calculateReward(account);
    
            setRewardData(reward.toString());
          } catch (error) {
            console.error('Error fetching reward data:', error);
          }
        };
    
        // Fetch reward data initially and then at a specified interval (e.g., every 5 seconds)
        fetchRewardData();
        const interval = setInterval(fetchRewardData, 5000);
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
      }, []);

  
      
    


    return (
        <>
            <div style={{ marginTop: "20vh" }}>
                <div>
                    <input type="number"  value={amount}  placeholder='Enter Tokens' onChange={handleAmountChange} />
                    <button onClick={stakeHandler}>Stake</button>
                </div>

                <div>
                    <p>Earned Rewards:</p>
                    {rewardData !== null ? <p>{rewardData}</p> : <p>Loading...</p>}

                </div>

                <div>
                    <button onClick={UnstakeToken}>Unstake</button>
                </div>

            </div>

        </>
    )
}
