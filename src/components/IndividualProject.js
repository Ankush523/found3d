import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useAccount, useProvider, useSigner } from 'wagmi';
import ERC20ABI from '../SmartContracts/ABIs/ERC20ABI';

const IndividualProject = () => {
    
    const {id} = useParams()
    const [approved, setApproved] = useState(false);
    const [loading, setLoading] = useState(false);

    const{address} = useAccount();
    const account = address;

    const{data:signer}=useSigner()
    const provider = useProvider()
    const contract = new ethers.Contract('0x25bb1f110Ff3DF9Fe2ad8dBdD2fd4cB9a06183cF',FundABI,signer);
    const fDAIx = new ethers.Contract('0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00',ERC20ABI,signer);
    console.log(contract)
    console.log(fDAIx)

   const approveCoins = async() => {
        await fDAIx.approve(contract.address,'10000000000000000000000000');
        setApproved(true);
   }

    const checkApproval = async() => {
        const amt = await fDAIx.allowance(account,contract)
        if(amt > 0)
        {
            setApproved(true)
        }
        else
        {
            setApproved(false)
        }
    }

    const funding = async() => {
        setLoading(true)
        await contract.funding(id.toString());
        setLoading(false)
    }

    useEffect(() => {
        checkApproval();
    })

    const[lists,setList] = useState([]);

    const getlist = async() => {
        setList([]);
        var list = await contract.projectlist(id.toString());
        console.log(list)
        setList(list)
    }
    console.log(lists)
    return (
    <div>
        <div className='flex flex-col justify-center p-5'>
            <div>
                <button onClick={getlist} className='mt-[30px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Get List</button>
            </div>
            <div className='border border-black1'>
                <div className='flex flex-col justify-center p-5'>
                    <label className='text-xl font-poppins text-blue1 font-semibold '>Project Name : {lists.proj_name}</label>
                    <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Project Description : {lists.proj_desc}</label>
                    <div>
                    {
                        // approved ? <button onClick={funding} className='mt-[20px] bg-blue1 text-white1 py-[2px] rounded-md'>Fund</button> : <button onClick={approveCoins} className='mt-[20px] bg-blue1 text-white1 py-[2px] rounded-md'>Approve</button>
                        
                        approved ? <button onClick={funding} className='mt-[20px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Fund</button> : <button onClick={approveCoins} className='mt-[20px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Approve</button>
                    }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IndividualProject