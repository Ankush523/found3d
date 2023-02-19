import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useAccount, useProvider, useSigner } from 'wagmi';
import ERC20ABI from '../SmartContracts/ABIs/ERC20ABI';
import { Player } from '@livepeer/react';

const IndividualProject = () => {
    
    const {id} = useParams()
    const [approved, setApproved] = useState(false);
    const [loading, setLoading] = useState(false);

    const{address} = useAccount();
    const account = address;

    const{data:signer}=useSigner()
    const provider = useProvider()
    const contract = new ethers.Contract('0xBEd8bbDFcFed5e59b3f06295175587bc35cCf138',FundABI,signer);
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
        <div className='flex flex-col justify-center mx-[40px]'>
            <div className='flex flex-row justify-between mt-[20px] mb-[40px]'>
                <label className='text-5xl font-poppins text-blue1'>Project Details</label>
                <div>
                    <button onClick={getlist} className='w-full bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px] '>Get Project Details</button>
                </div>
            </div>
            <div className='flex flex-row gap-5'>
                <div className='w-[40%]'>
                    <Player
                    title={lists.proj_name}
                    playbackId="e9c950mbxjsmgtpp"
                    showTitle={false}
                    showPipButton
                    aspectRatio="16to9"
                    />
                </div>
                <div className='flex flex-col border border-blue1 rounded-2xl w-[50%] p-[30px] text-left '>
                    <label className='text-5xl font-poppins text-blue1 font-semibold '>{lists.proj_name}</label>
                    <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>{lists.proj_desc}</label>
                </div>
            </div>
            <div>
            {                        
                approved ? <button onClick={funding} className='mt-[40px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[50px] py-[10px]'>Fund</button> : <button onClick={approveCoins} className='mt-[40px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[50px] py-[10px]'>Approve and Fund </button>
            }
            </div>
        </div>
    </div>
  )
}

export default IndividualProject