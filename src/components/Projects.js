import React, { useState } from 'react'
import { ethers } from 'ethers';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useSigner } from 'wagmi';
const Projects = () => {

    const{data:signer}=useSigner();
    const contract = new ethers.Contract('0x2051DF7e50982105F09b71925cE610E2645ED863',FundABI,signer);
    console.log(contract)
    const[lists,setList] = useState([]);

    const getlist = async() => {
        var len = await contract.receiveProjectid();
        console.log(len.toString())
        var parseList = len.toString();
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
            <div>
            {
                lists.map((list) => {
                    return(
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-row justify-center'>
                            <div className='flex flex-col justify-center'>
                                <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Project Name : {list.proj_name}</label>
                                <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Project Description : {list.proj_desc}</label>
                                <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Project Amount : {(list.goalAmount).toString()}</label>
                                <label className='text-xl font-poppins text-blue1 font-semibold pt-[20px]'>Completion Time : {(list.time).toString()}</label>
                            </div>
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