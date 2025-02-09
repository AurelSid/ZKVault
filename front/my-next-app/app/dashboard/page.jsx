"use client"
import React, { useState, useEffect } from 'react';
import BurgerMenu from '../../components/burger';
import { connectWallet } from '../web3_funct';
import { ethers } from "ethers";
import { fetch_prices } from '../flare';
import Public_vaults from '../../components/Public_vaults';
import Manage_vaults from '@/components/Manage_vaults';
const Page = () => {
  fetch_prices();
  return (
    <div className='h-full mx-5 grid gap-4'>
      <BurgerMenu />
     <Public_vaults/>

    </div>
  );
};

export default Page;

