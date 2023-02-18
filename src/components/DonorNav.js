import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
const DonorNav = () => {
  return (
    <div className="flex flex-row justify-between w-[100vw] h-[fit-content] px-[80px] py-[40px]">
        <label className="font-poppins font-medium text-blue1 text-5xl">WELCOME TO DONOR PORTAL</label>
        <ConnectButton/>
    </div>
  );
};

export default DonorNav;