import React, { useState, useEffect } from "react";
import { connectWallet } from "../app/web3_funct";
import { fetch_prices } from "../app/flare";
import tokensData from "../app/token_feeds.json";
import { motion } from "framer-motion";
import Manage_vaults from "./Manage_vaults";
import {
  fetchVaultNames,
  fetchVaultTokens,
  handleAddToVault,
  handleRemoveToVault,
} from "../app/contractFunct";
import { fetchUserInvestment } from "../app/use_investments";

const Public_vaults = () => {
  const [vaultNames, setVaultNames] = useState([]);
  const [vaultDetails, setVaultDetails] = useState([]);
  const [signerAddr, setSignerAddr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [actionType, setActionType] = useState(null); // track add/remove action
  const [selectedVault, setSelectedVault] = useState(null); // Track the selected vault

  const getVaultNames = async () => {
    try {
      const names = await fetchVaultNames();
      setVaultNames(names);
      fetchVaultTokensData(names);
    } catch (error) {
      console.error("Error fetching vault names:", error);
    }
  };

  const fetchVaultTokensData = async (names) => {
    try {
      const details = await fetchVaultTokens(names);
      setVaultDetails(details);
    } catch (error) {
      console.error("Error fetching vault tokens:", error);
    }
  };

  useEffect(() => {
    getVaultNames();

    const fetchAddress = async () => {
      const walletData = await connectWallet();
      if (walletData && walletData.signerAddress) {
        setSignerAddr(walletData.signerAddress);
      }
    };
    fetchAddress();
  }, []);

  fetch_prices();

  const getTokenDetails = (tokenName) => {
    for (let category in tokensData) {
      for (let token of tokensData[category]) {
        if (token.name.includes(tokenName)) {
          return {
            address: token.address,
            realprice: token.realprice,
            logo: token.logo,
          };
        }
      }
    }
    return { address: null, realprice: null };
  };

  const handleAmountSelection = (amount, vault_name) => {
    const adjustedAmount = actionType === "add" ? amount : -amount;
    setSelectedAmount(adjustedAmount);
    setShowPrompt(null);
    if (adjustedAmount > 0) {
      handleAddToVaultClick(vault_name, amount);
    } else {
      handleRemoveToVaultClick(vault_name, amount);
    }
  };

  const handleAddToVaultClick = async (vault_name, amount) => {
    try {
      setLoading(true);
      const result = await handleAddToVault(vault_name, signerAddr, amount);
      console.log("Vault updated:", result);
    } catch (error) {
      console.error("Error adding to vault:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveToVaultClick = async (vault_name, amount) => {
    try {
      setLoading(true);
      const result = await handleRemoveToVault(vault_name, signerAddr, amount);
      console.log("Vault updated:", result);
    } catch (error) {
      console.error("Error removing from vault:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="mt-20">
        <div className="h-20 p-3 bg-gray-800 rounded-xl flex items-center -z-30">
          <img src="user.svg" alt="User" className="h-full invert" />
          {signerAddr && (
            <span className="text-white ml-3">
              {signerAddr.slice(0, 20)}...{signerAddr.slice(-4)}
            </span>
          )}
        </div>

        <motion.div
          className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-xl text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {vaultNames.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-4 flex justify-center items-center text-white text-xl">
              Loading vaults...
            </div>
          ) : (
            vaultDetails.map((vault, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="text-white text-xl font-semibold">
                  {vault.name}
                </div>
                <div className=" mt-4 mb-4 flex ">
                  {vault.tokens.map((token, idx) => {
                    const { address, realprice, logo } = getTokenDetails(token);

                    return (
                      <div key={idx} className=" w-full">
                        <div className="bg-gray-800 mx-2 p-4 rounded-md">
                          <p className="font-medium justeify-center items-center text-center text-white">
                            {token}
                          </p>
                          <img
                            className="h-12 justify-center items-center m-auto flex my-2"
                            src={logo}
                          ></img>
                          {realprice && (
                            <p className="text-sm text-center text-teal-500 ">
                              ${realprice.toFixed(5)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className=" flex flex-col gap-3">
                  <button
                    className={`py-3 rounded-md transition-colors ${
                      actionType === "add" && selectedVault === vault.name
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-teal-600 hover:bg-teal-700"
                    } text-white`}
                    onClick={() => {
                      setActionType("add");
                      setSelectedVault(vault.name);
                      setShowPrompt(vault.name);
                    }}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "ADD TO VAULT"}
                  </button>
                  <button
                    className={`py-3 rounded-md transition-colors ${
                      actionType === "remove" && selectedVault === vault.name
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-teal-600 hover:bg-teal-700"
                    } text-white`}
                    onClick={() => {
                      setActionType("remove");
                      setSelectedVault(vault.name);
                      setShowPrompt(vault.name);
                    }}
                    disabled={loading}
                  >
                    {loading ? "Removing..." : "REMOVE FROM VAULT"}
                  </button>
                </div>

                {showPrompt === vault.name && (
                  <motion.div
                    className="flex justify-center gap-4 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.button
                      key={`amount-20-${vault.name}-${actionType}`}
                      onClick={() => handleAmountSelection(20, vault.name)}
                      className={`py-2 px-4 rounded-md transition-colors ${
                        actionType === "add" ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      20
                    </motion.button>
                    <motion.button
                      key={`amount-50-${vault.name}-${actionType}`}
                      onClick={() => handleAmountSelection(50, vault.name)}
                      className={`py-2 px-4 rounded-md transition-colors ${
                        actionType === "add" ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      50
                    </motion.button>
                    <motion.button
                      key={`amount-100-${vault.name}-${actionType}`}
                      onClick={() => handleAmountSelection(100, vault.name)}
                      className={`py-2 px-4 rounded-md transition-colors ${
                        actionType === "add" ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      100
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        <Manage_vaults vaultsDetails={vaultDetails} userAddr={signerAddr} />
      </div>
    </div>
  );
};

export default Public_vaults;
