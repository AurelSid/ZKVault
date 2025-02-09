import { ethers } from "ethers";

let provider = null;
let signer = null;
let contract = null;

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Change to your contract address
const contractABI = [
];

export const initializeProvider = () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    console.error("No Ethereum provider found");
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("No Ethereum provider found");
      return null;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = provider.getSigner();
    const signer_address = await signer.getAddress();
    console.log("Connected Wallet Address:", signer_address);

    contract = new ethers.Contract(contractAddress, contractABI, signer);

    return { provider, signer, contract, signerAddress: signer_address };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};

export const getContract = () => contract;
export const getSigner = () => signer;
export const getProvider = () => provider;
