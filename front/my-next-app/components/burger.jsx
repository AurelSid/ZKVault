"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-black">
      <button
        className="fixed top-4  left-4 z-[60] text-white p-2 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-10 w-10 text-white" />
        ) : (
          <Menu className="h-10 w-10 text-white" />
        )}
      </button>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black text-white flex items-center justify-center transition-transform duration-300 z-[50] ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-white"
          onClick={() => setIsOpen(false)}
        ></button>

        <ul className="flex flex-col space-y-6 text-xl text-center">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="invert h-8 text-white fixed top-7 right-7 flex">
        <img src="logo.svg" alt="" className="w-6 mr-1" />
        <h1 className="invert text-xl font-bold">ZkVault</h1>
      </div>
    </div>
  );
};

export default BurgerMenu;
