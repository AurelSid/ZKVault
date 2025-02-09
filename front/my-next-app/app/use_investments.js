import { ethers } from "ethers";
import { contractABI } from './Abi.js';  // Adjust the path if necessary

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");  // Local Hardhat network
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const fetchUserInvestment = async (vaultName, userAddress) => {
  try {
    let investment;
    if (vaultName === "Gaming Vault") {
      investment = await contract.Gaming_investments(userAddress);
    } else if (vaultName === "DeFi Vault") {
      investment = await contract.Defi_investments(userAddress);
    } else if (vaultName === "Meme Vault") {
      investment = await contract.Meme_investments(userAddress);
    }

    if (investment === undefined) {
      console.log(`No investment found for ${userAddress} in ${vaultName}`);
      return null;  // Return null if no investment exists
    }

    console.log(`User's investment in ${vaultName}:`, investment.toString());
    return investment;
  } catch (error) {
    console.log(`Error fetching investment for ${vaultName}:`, error);
    throw error;
  }
};
