import React from 'react'
import GranteeNav from '../components/GranteeNav'

const Grantee = () => {
  return (
    <div>
        <div className='border-b border-b-grey1'>
            <GranteeNav/>
        </div>

        <div className='flex flex-row px-[80px]'>

            <div className='w-[35%] h-[100vh] border-r border-r-grey1 pt-[80px]'>
                <div className='flex flex-col text-left border border-blue2 mr-[80px] px-[10px] py-[30px] rounded-xl shadow-2xl bg-white1'>
                    <label className='text-3xl font-poppins text-blue1 font-semibold pb-[30px]'>Project Details</label>
                    <label className='text-sm font-poppins'>Name of Project : </label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px]'/>                    
                    <label className='text-sm font-poppins pt-[20px]'>Project Description : </label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[100px]'/>
                    <label className='text-sm font-poppins pt-[20px]'>Goal Amount : </label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px]'/>
                    <label className='text-sm font-poppins pt-[20px]'>Current Progress : </label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px]'/>
                </div>

                <div className='mr-[80px]'>
                    <button className='mt-[30px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Submit</button>
                </div>
            </div>

            <div className='w-[65%] flex flex-col'>
                <label className='text-3xl font-poppins text-blue1 font-semibold pt-[20px]'>Your Projects</label>
            </div>
        </div>
    </div>
  )
}

export default Grantee