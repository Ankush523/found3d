import React from 'react'

const DonorIntro = () => {
    return (
        <div className='flex flex-col'>
               
            <label className='font-poppins text-2xl text-blue1 font-medium mb-[50px]'>Connect to fund3d</label>
    
            <div className='flex flex-row justify-center space-x-6 mb-[30px]'>
                <a href='/projects'>
                    <div className='rounded-2xl bg-white1 shadow-xl pt-[40px] w-[275px] h-[150px]'>
                        <label className='font-poppins text-md text-black1'>View Stunning Projects</label>
                        <p className='font-poppins text-grey2 text-xs pt-[10px]'>View all the amazing projects made by developers all around the globe</p>
                    </div>
                </a>
                <a href='/projects'>
                    <div className='rounded-2xl bg-white1 shadow-xl pt-[40px] w-[275px] h-[150px]'>
                        <label className='font-poppins text-md text-black1'>Fund Projects</label>
                        <p className='font-poppins text-grey2 text-xs pt-[10px]'>Provide funds/grants to your favourite projects</p>
                    </div>
                </a>
            </div>
    
            <div className='flex flex-row justify-center space-x-6'>
                <a href='https://app.superfluid.finance/'>
                    <div className='rounded-2xl bg-white1 shadow-xl pt-[40px] w-[275px] h-[150px]'>
                        <label className='font-poppins text-md text-black1'>Track Streams</label>
                        <p className='font-poppins text-grey2 text-xs pt-[10px]'>View and track your ongoing streams</p>
                    </div>
                </a>
    
                <div className='rounded-2xl bg-white1 shadow-xl pt-[40px] w-[275px] h-[150px]'>
                    <label className='font-poppins text-md text-black1'>Try out flow</label>
                    <p className='font-poppins text-grey2 text-xs pt-[10px]'>Start on a testnet</p>
                </div>
            </div>
        </div>
      )
    }
    

export default DonorIntro