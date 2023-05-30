import React from 'react'
import { Link } from "react-router-dom";
const { ethers } = require("ethers");


export default function Navbar() {

    async function connectToMetaMask() {
        // Check if MetaMask is installed
        if (typeof window.ethereum === "undefined") {
          console.log("Please install MetaMask to use this script.");
          return;
        }
      
        // Request access to the user's MetaMask account
        await window.ethereum.request({ method: "eth_requestAccounts" });
      
        // Create an Ether.js provider using MetaMask provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      
        // Get the signer (account) from the provider
        const signer = provider.getSigner();
      
        // Connect to a contract or perform other actions using the signer
        // For example:
        const network = await provider.getNetwork();
        console.log("Connected to network:", network.name);
      
        const balance = await signer.getBalance();
        console.log("Account balance:", ethers.utils.formatEther(balance));
      }

    return (
        <>
            <div style={{ display: "flex", width:"100%",justifyContent:"space-between" ,alignItems:"center" }}>
                <div style={{marginLeft:"20px"}}>
                    <h2>EARNSTAKE</h2>
                </div>
                <div> <Link  to='/'>Home</Link>
                    <Link style={{margin:"0px 20px"}}  to='/Minting'>Token Minting</Link>
                    
                    </div>
                <div>
                    <button onClick={connectToMetaMask} style={{padding:"10px", marginRight:"20px", fontSize:"16px", borderRadius:"10px"}}>Connect wallet</button>
                </div>
            </div>
        </>
    )
}
