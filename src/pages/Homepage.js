import React from 'react'
import Navbar from '../components/Navbar'
import gift from "../images/gift.png";
const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex flex-row px-[100px]'>
        <div className='flex flex-col text-left px-[50px] w-[80%] pt-[180px]'>
          <label className='text-8xl font-bold text-black1 font-poppins pb-[30px]'>Stream grants every second.</label>
          <p className='text-2xl font-poppins text-black1 pb-[30px]'>A platform for individuals/initiatives looking for funding/grants. Donors could scroll through profiles and provide recurring funding through a Superfluid stream. </p>
          <a href='/elements'>
            <button className="bg-green1 rounded-xl text-white1 font-poppins font-semibold px-[20px] w-[fit-content] h-[50px] hover:bg-green3">
              Launch App
            </button>
          </a>
        </div>
        <div className=''>
          <img src={gift} alt="pic1" className='h-[600px] w-[800px]'/>
        </div>
      </div>
    </div>
  )
}

export default Homepage