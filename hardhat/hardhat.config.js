require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-vyper");
import "@nomicfoundation/hardhat-toolbox-viem";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // Vyper configuration (for Vyper contracts)
  vyper: {
    version: "0.4.0",
  },

  // Solidity configuration (set to ^0.8.20 to match OpenZeppelin)
  solidity: {
    version: "0.8.21", // Updated version to match OpenZeppelin
    settings: {
      optimizer: {
        enabled: true, // Enable optimization (optional)
        runs: 200, // Set optimization runs
      },
    },
  },

  // Paths configuration
  paths: {
    artifacts: "./artifacts", // Where compiled contracts are stored
    sources: "./contracts", // Source directory for contracts
  },

  // Network configuration
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Local network URL
    },
  },

  // Debug settings (optional)
  debug: false, // Set to true if you want to enable debugging
};
