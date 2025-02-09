import React, { useState, useEffect } from 'react';
import { fetchVaultNames, fetchVaultTokens } from '../app/contractFunct'; 
import { fetchUserInvestment } from '../app/use_investments';

const isUserSubscribed = (vault, userAddr) => {
  return vault.users && vault.users.includes(userAddr);
};

const Manage_vaults = ({ userAddr }) => {
  const [vaultsDetails, setVaultsDetails] = useState([]);
  const [investments, setInvestments] = useState({
    "Gaming Vault": 0,
    "Defi Vault": 0,
    "Meme Vault": 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      getVaultsDetails();
    }
  };

  const getVaultsDetails = async () => {
    try {
      const vaultNames = await fetchVaultNames();
      const vaultTokens = await fetchVaultTokens(vaultNames);
      const updatedVaultDetails = await Promise.all(
        vaultTokens.map(async (vault) => {
          // Fetch investment for each vault and include it in the vault details
          const investmentAmount = await fetchUserInvestment(vault.name, userAddr);
          return {
            ...vault,
            investmentAmount,
            isSubscribed: isUserSubscribed(vault, userAddr), 
          };
        })
      );
      setVaultsDetails(updatedVaultDetails);
    } catch (error) {
      console.error('Error fetching vault details:', error);
    }
  };

  useEffect(() => {
    if (userAddr) {
      getVaultsDetails();
    }
  }, [userAddr]);

  return (
    <div className='w-full justify-center items-center flex flex-col mt-4'>
      <div className='flex items-center w-full justify-center rounded-t-md cursor-pointer bg-gray-700 border-gray-700' onClick={togglePanel}>
        <h1 className=' h-20 justify-center items-center flex text-center rounded-md font-bold'>
          MANAGE MY VAULTS
        </h1>
        <span
          className={`ml-2 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
        >
          ▼
        </span>
      </div>

      <div
        className={`w-full bg-gray-700 grid gap-4 rounded-b-md overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
      >
        <div className='p-4 '>
          {vaultsDetails.length === 0 ? (
            <p>No vaults available or loading...</p>
          ) : (
            vaultsDetails.map((vault, index) => (
              vault.isSubscribed && ( 
                <div key={index} className=' bg-slate-600 p-3 mb-3 rounded-md '>
                  <h2 className='font-bold'>{vault.name}</h2>
                  <p>Details about {vault.name}</p>
                  {vault.investmentAmount > 0 ? (
                    <p className="text-green-400">Invested: {vault.investmentAmount.toString()} tokens</p>
                  ) : (
                    <p className="text-red-400">No investment yet</p>
                  )}
                </div>
              )
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Manage_vaults;
