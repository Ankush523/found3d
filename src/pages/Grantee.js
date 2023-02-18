import React, { useState } from 'react'
import GranteeNav from '../components/GranteeNav'
import { ethers } from 'ethers';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useSigner } from 'wagmi';
import GetSF from '../hooks/GetSF';
import { useProvider } from 'wagmi'

const Grantee = () => {

    const[lists,setList] = useState([]);
    const [projectname, setProjectName] = useState("");
    const [projectdesc, setProjectDesc] = useState("");
    const [goalamount, setGoalAmount] = useState(null);
    const [time, setTime] = useState(null);

    const [daixbal, setDaixbal] = useState(null);           
    
    const{data:signer}=useSigner();
    const provider = useProvider()

    const contract = new ethers.Contract('0x25bb1f110Ff3DF9Fe2ad8dBdD2fd4cB9a06183cF',FundABI,signer);
  
    const fundDetails=async()=>{

        console.log("fundDetails");

        const sf = await GetSF();
        console.log(sf);

        const fdaix = await sf.loadSuperToken('0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00');
        console.log(fdaix);

        const realtimebal = await fdaix.realtimeBalanceOf({
            account: '0x1e87f3F4FDBb276250fC064a3cf0069592280601',
            timestamp: Date.now(),
            providerOrSigner: signer || provider,
          });

        console.log(realtimebal.availableBalance);
        
        setDaixbal(realtimebal.availableBalance);
        console.log(ethers.utils.formatEther(daixbal));

        setTimeout(fundDetails, 5000);

    }

    fundDetails();



    const projectdetails = async () => {
        if(projectname !== '' && projectdesc !== '' && goalamount !== null && time !== null){
            console.log(contract);
        await contract.projectregister(projectname, projectdesc, goalamount, time);
        }else{
        alert("Fill All Details")
        }
    };

    const getlist = async() => {
        setList([]);
        var list = await contract.pvtprojectlist();
        console.log(list)
        setList(list)
    }

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
                {/* <div>
                    {Number(ethers.utils.formatEther(daixbal)).toFixed(8)}
                </div> */}
                <div>
                    <button onClick={getlist} className='mt-[30px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Get List</button>
                </div>
                <div className="grid gap-4 grid-cols-3 grid-rows-3 mt-[40px]">
                {
                    lists.map((list) => {
                        return(
                            <div className='border border-blue1 rounded-2xl text-left bg-white1 shadow-xl'>
                                <div className='flex flex-col justify-center p-5'>
                                    <label className='text-xl font-poppins text-blue1 font-semibold '>Project Name : {list.proj_name}</label>
                                    <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Project Description : {list.proj_desc}</label>
                                    <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Target Amount : {(list.goalAmount).toString()}</label>
                                    <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Completion Time : {(list.time).toString()}</label>
                                </div>
                            </div>
                        )
                    })
                }  
            </div>
            </div>
        </div>
    </div>
  )
}

export default Grantee