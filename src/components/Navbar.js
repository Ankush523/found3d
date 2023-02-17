import React from "react";
const Navbar = () => {
  return (
    <div className="flex flex-row justify-between w-[100vw] h-[fit-content] px-[100px] py-[50px]">
      <div className="flex flex-row">
        <label className="font-poppins font-semibold text-green1 ml-[40px] text-4xl">Found3d</label>
      </div>
      <div className="flex flex-row space-x-3">
        <button className="bg-green1 rounded-xl text-white1 font-poppins font-semibold px-[20px] hover:bg-green3">
          <a href="/elements">Login As Grantee</a>
        </button>
        <button className="bg-green1 rounded-xl text-white1 font-poppins font-semibold px-[20px] hover:bg-green3">
          <a href="/elements">Login As Donor</a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;