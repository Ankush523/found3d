import React, { useState } from 'react'
import DonorIntro from '../components/DonorIntro';
import DonorNav from '../components/DonorNav'
import Projects from '../components/Projects';

const Donor = () => {

  const [selection, setSelection] = useState("1");

  return (
    <div>
        <div className='border-b border-b-grey1'>
          <DonorNav/>
        </div>

        <div className='flex flex-row px-[80px]'>

          <div className='flex flex-col w-[20%] h-[100vh] border-r border-r-grey1 pt-[80px] pr-[80px]'>
              <button onClick={() => setSelection(1)} className='bg-white1 h-[50px] text-xl text-blue1 font-poppins shadow-2xl rounded-lg mb-[30px] hover:bg-blue1 hover:text-white1'>Intro</button>
              <button onClick={() => setSelection(2)} className='bg-white1 h-[50px] text-xl text-blue1 font-poppins shadow-2xl rounded-lg mb-[30px] hover:bg-blue1 hover:text-white1'>Project Panel</button>
              <button className='bg-white1 h-[50px] text-xl text-blue1 font-poppins shadow-2xl rounded-lg mb-[30px] hover:bg-blue1 hover:text-white1'>
                <a href='https://app.superfluid.finance/'>
                  Track Streams
                </a>
              </button>
          </div>

          <div className='h-[100vh] w-[80%] px-4 mt-[100px]'>
          {selection == "1" ? (
            <div>
              <DonorIntro />
            </div>
          ) : (
            <div>
              <Projects/>
            </div>
          )
        }
          </div>
        </div>
    </div>
  )
}

export default Donor