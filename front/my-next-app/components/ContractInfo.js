'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contractABI = [
  {
    "stateMutability": "payable",
    "type": "function",
    "name": "bid",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "endAuction",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "beneficiary",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "auctionStart",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "auctionEnd",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "highestBidder",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "highestBid",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  }
];

export default function LockContract() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [beneficiary, setBeneficiary] = useState(null);
  const [auctionStart, setAuctionStart] = useState(null);
  const [auctionEnd, setAuctionEnd] = useState(null);
  const [highestBidder, setHighestBidder] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return alert("No Ethereum provider found");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);
    fetchContractData(contract);
    const signer_address = await signer.getAddress();
    console.log("Connected Wallet Address:", signer_address);
  };

  const fetchContractData = async (contract) => {
    try {
      const beneficiary = await contract.beneficiary();
      const auctionStart = await contract.auctionStart();
      const auctionEnd = await contract.auctionEnd();
      const highestBidder = await contract.highestBidder();
      const highestBid = await contract.highestBid();

      setBeneficiary(beneficiary);
      setAuctionStart(auctionStart.toString());
      setAuctionEnd(auctionEnd.toString());
      setHighestBidder(highestBidder);
      setHighestBid(ethers.utils.formatEther(highestBid));

    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  };

  const placeBid = async () => {
    if (!contract) return alert("Connect wallet first");
    const tx = await contract.bid({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Bid placed successfully!");
    fetchContractData(contract);
  };

  const endAuction = async () => {
    if (!contract) return alert("Connect wallet first");
    const tx = await contract.endAuction();
    await tx.wait();
    alert("Auction ended successfully!");
    fetchContractData(contract);
  };

  const withdraw = async () => {
    if (!contract) return alert("Connect wallet first");
    const tx = await contract.withdraw();
    await tx.wait();
    alert("Withdraw successful!");
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Auction Contract</h1>
      <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded mb-4">
        Connect Wallet
      </button>

      {beneficiary && <p><strong>Beneficiary:</strong> {beneficiary}</p>}
      {auctionStart && <p><strong>Auction Start:</strong> {new Date(auctionStart * 1000).toLocaleString()}</p>}
      {auctionEnd && <p><strong>Auction End:</strong> {new Date(auctionEnd * 1000).toLocaleString()}</p>}
      {highestBidder && <p><strong>Highest Bidder:</strong> {highestBidder}</p>}
      {highestBid && <p><strong>Highest Bid:</strong> {highestBid} ETH</p>}

      <div className="mt-4 flex gap-4">
        <button onClick={placeBid} className="bg-green-500 px-4 py-2 rounded">Place Bid</button>
        <button onClick={endAuction} className="bg-yellow-500 px-4 py-2 rounded">End Auction</button>
        <button onClick={withdraw} className="bg-red-500 px-4 py-2 rounded">Withdraw</button>
      </div>
    </div>
  );
}
