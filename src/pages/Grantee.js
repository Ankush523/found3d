import React, { useState } from 'react'
import GranteeNav from '../components/GranteeNav'
import { ethers } from 'ethers';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useSigner } from 'wagmi';

const Grantee = () => {

    const{data:signer}=useSigner();

    const [projectname, setProjectName] = useState("");
    const [projectdesc, setProjectDesc] = useState("");
    const [goalamount, setGoalAmount] = useState(null);
    const [time, setTime] = useState(null);

    const contract = new ethers.Contract('0xed1dBF14C63eBDeeb7Fc553528e889c0423B8df2',FundABI,signer);
  
    const projectdetails = async () => {
        if(projectname !== '' && projectdesc !== '' && goalamount !== null && time !== null){
            console.log(contract);
        await contract.projectregister(projectname, projectdesc, goalamount, time);
        }else{
        alert("Fill All Details")
        }
    };

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
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px] pl-[10px]' placeholder='Name' value={projectname} onChange={(e) => setProjectName(e.target.value)}/>                    
                    <label className='text-sm font-poppins pt-[20px]'>Project Description : </label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[100px] pl-[10px]' placeholder='Description' value={projectdesc} onChange={(e) => setProjectDesc(e.target.value)}/>
                    <label className='text-sm font-poppins pt-[20px]'>Goal Amount : </label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px] pl-[10px]' placeholder='0.00' value={goalamount} onChange={(e) => setGoalAmount(e.target.value)}/>
                    <label className='text-sm font-poppins pt-[20px]'>Time of Completion : </label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px] pl-[10px]' placeholder='0' value={time} onChange={(e) => setTime(e.target.value)}/>
                </div>

                <div className='mr-[80px]'>
                    <button onClick={projectdetails} className='mt-[30px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Submit</button>
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