import React from "react";
const Navbar = () => {
  return (
    <div className="flex flex-row justify-between w-[100vw] h-[fit-content] px-[100px] py-[50px]">
      <div className="flex flex-row">
        <label className="font-poppins font-semibold text-blue1 ml-[40px] text-4xl">Found3d</label>
      </div>
      <div className="flex flex-row space-x-3">
        <button className="bg-blue1 rounded-xl text-white1 font-poppins font-semibold px-[20px]">
          <a href="/grantee">Login As Grantee</a>
        </button>
        <button className="bg-blue1 rounded-xl text-white1 font-poppins font-semibold px-[20px]">
          <a href="/donor">Login As Donor</a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;