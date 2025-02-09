import { useState, useEffect } from "react";
import { ethers } from "ethers";
import logo from "../public/logo.svg";
import { connectWallet } from "../app/web3_funct";
import Link from "next/link"; // Import Link from Next.js for routing

const Hero = () => {
  const [signerAddr, setSignerAddr] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) {
        console.error("No Ethereum provider found");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        setSignerAddr(accounts[0]); 
      }
    };

    checkConnection();
    setFadeIn(true);
  }, []);

  const handleWalletConnect = async () => {
    if (!signerAddr) {
      const walletData = await connectWallet();
      if (walletData && walletData.signerAddress) {
        setSignerAddr(walletData.signerAddress);
      }
    }
  };

  return (
    <div
      className={`h-[80vh] justify-center items-center flex flex-col m-14 gap-5 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-4xl font-black text-center">ZKVault</h1>
          <h1 className="text-md font-black text-center my-3">ZERO TO HERO YOUR PORTFOLIO</h1>
          <img src="logo.svg" alt="Logo" className="invert" />
        </div>
      </div>

      <h1 className="text-md font-black text-center">
        Invest smart, track easy – Web3 vaults made simple.
      </h1>

      {signerAddr ? (
        <Link href="/dashboard">  {/* Change the URL to your dashboard page */}
          <button className="text-md font-bold bg-neutral-600 p-6 rounded-md mt-16">
            ENTER DASHBOARD
          </button>
        </Link>
      ) : (
        <button
          className="text-md font-bold bg-neutral-600 p-6 rounded-md mt-16"
          onClick={handleWalletConnect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Hero;
