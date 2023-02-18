import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useAccount, useProvider, useSigner } from 'wagmi';
import { Link } from 'react-router-dom';
import ERC20ABI from '../SmartContracts/ABIs/ERC20ABI';

const Projects = () => {

    // const [approved, setApproved] = useState(false);
    // const [loading, setLoading] = useState(false);

    // const{address} = useAccount();
    // const account = address;

    const{data:signer}=useSigner();
    const contract = new ethers.Contract('0x25bb1f110Ff3DF9Fe2ad8dBdD2fd4cB9a06183cF',FundABI,signer);
    const provider = useProvider();
    // const fDAIx = new ethers.Contract('0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00',ERC20ABI,signer);
    // console.log(contract)
    // console.log(fDAIx)
    // const approveCoins = async() => {
    //     await fDAIx.approve(contract.address,'10000000000000000000000000');
    //     setApproved(true);
    // }
   
    // const checkApproval = async() => {
    //     const amt = await fDAIx.allowance(account,contract)
    //     if(amt > 0)
    //     {
    //         setApproved(true)
    //     }
    //     else
    //     {
    //         setApproved(false)
    //     }
    // }

    // const funding = async() => {
    //     setLoading(true)
    //     await contract.funding('1');
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     checkApproval();
    // })

    const[lists,setList] = useState([]);
    const getlist = async() => {
        var proj_id = await contract.receiveProjectid();
        console.log(proj_id.toString())
        var parseList = proj_id.toString();
        setList([]);
        for(let i=1;i<=parseList;i++)
        {
            var list = await contract.projectlist(i);
            console.log(list)
            setList((lists) => [...lists,list])
        }
    }
    console.log(lists)


    return (
        <div className='flex flex-col justify-center'>
            <label className='text-4xl text-blue1 font-medium font-poppins py-[20px]'> Project Panel</label>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col text-left pl-[80px]'>
                    <p className='text-md font-poppins'>To view all the amazing projects created by</p>
                    <p className='text-md font-poppins'>developers all around the globe click on VIEW PROJECTS</p>
                </div>
                <button onClick={getlist} className='bg-white1 text-blue1 text-lg font-poppins border border-blue1 rounded-lg px-[20px] my-[5px] shadow-2xl hover:bg-blue1 hover:text-white1 mr-[80px]'>VIEW PROJECTS</button>
            </div>
            <div className="grid gap-4 grid-cols-3 grid-rows-3 mt-[40px]">
            {
                lists.map((list) => {
                    return(
                    <div className='border border-blue1 rounded-2xl text-left bg-white1 shadow-xl'>
                        <div className='flex flex-col justify-center p-5' key={list.proj_id}>
                            <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Project Id : {(list.proj_id).toString()}</label>
                            <label className='text-xl font-poppins text-blue1 font-semibold '>Project Name : {list.proj_name}</label>
                            <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Project Description : {list.proj_desc}</label>
                            <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Target Amount : {(list.goalAmount).toString()}</label>
                            <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Completion Time : {(list.time).toString()}</label>
                            <Link to={`/project/${list.proj_id}`}>
                                <button>View Project</button>
                            </Link>
                        </div>
                    </div>
                    )
                })
            }  
            </div>
        </div>
           
    )
}

export default Projects