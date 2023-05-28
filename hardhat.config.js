require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();



/** @type import('hardhat/config').HardhatUserConfig */


const ALCHEMY_API_KEY = process.env.REACT_APP_RPC_URL;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  defaultNetwork:"polygon",
  networks: {
    polygon: {
      url: ALCHEMY_API_KEY,
      accounts: [PRIVATE_KEY]
    }
  }
};
