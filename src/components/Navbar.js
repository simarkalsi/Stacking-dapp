import React from 'react'
import { Link } from "react-router-dom";


export default function Navbar({web3Handler}) {
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
                    <button onClick={web3Handler} style={{padding:"10px", marginRight:"20px", fontSize:"16px", borderRadius:"10px"}}>Connect wallet</button>
                </div>
            </div>
        </>
    )
}
