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
          <p className='text-2xl font-poppins text-black1 pb-[30px]'>A platform for individuals/initiatives looking for funding/grants.</p>
        </div>
        <div className=''>
          <img src={gift} alt="pic1" className='h-[600px] w-[800px]'/>
        </div>
      </div>
    </div>
  )
}

export default Homepage