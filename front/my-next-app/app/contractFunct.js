import { ethers } from "ethers";
import { contractABI } from './Abi.js';  // Adjust the path if necessary

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");  // Local Hardhat network
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Function to fetch vault names
export const fetchVaultNames = async () => {
  try {
    const names = await contract.getVaultNames();
    return names;
  } catch (error) {
    console.error("Error fetching vault names:", error);
    throw error;  // Rethrow to handle in the component
  }
};

// Function to fetch vault tokens
export const fetchVaultTokens = async (names) => {
  try {
    const details = await Promise.all(
      names.map(async (name, index) => {
        const vault = await contract.vaults_array(index);
        return {
          name: vault.vault_name,
          tokens: vault.vault_tokens,
          users: vault.users_addresses,
          usersss: vault.users_invest
        };
      })
    );
    return details;
  } catch (error) {
    console.error("Error fetching vault tokens:", error);
    throw error;
  }
};

export const handleAddToVault = async (vault_name, signerAddr, amount) => {
  try {
    // Ensure there's a signer available
    const signer = provider.getSigner();
    if (!signer) {
      throw new Error("Signer is not available.");
    }

    // Connect the contract with the signer
    const contractWithSigner = contract.connect(signer);

    // Call the addUserVault function with the vault name, user's address, and investment amount
    const result = await contractWithSigner.addUserVault(vault_name, signerAddr, amount, {
      gasLimit: 1000000  // Optional, you can adjust the gas limit if necessary
    });

    console.log(`Successfully added ${amount} to ${vault_name} for user ${signerAddr}`);
    return result;
  } catch (error) {
    console.error("Error adding to vault:", error);
    throw error;
  }
};

export const handleRemoveToVault = async (vault_name, signerAddr, amount) => {
  try {
    // Ensure there's a signer available
    const signer = provider.getSigner();
    if (!signer) {
      throw new Error("Signer is not available.");
    }

    // Connect the contract with the signer
    const contractWithSigner = contract.connect(signer);

    // Call the RemoveUserVault function with the vault name, user's address, and investment amount
    const result = await contractWithSigner.RemoveUserVault(vault_name, signerAddr, amount, {
      gasLimit: 1000000  // Optional, you can adjust the gas limit if necessary
    });

    console.log(`Successfully removed ${amount} from ${vault_name} for user ${signerAddr}`);
    return result;
  } catch (error) {
    console.error("Error removing from vault:", error);
    throw error;
  }
};
