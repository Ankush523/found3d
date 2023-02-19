import React, { useState } from 'react'
import GranteeNav from '../components/GranteeNav'
import { ethers } from 'ethers';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useSigner } from 'wagmi';
import GetSF from '../hooks/GetSF';
import { useProvider } from 'wagmi';
import { useCreateAsset } from '@livepeer/react';

const Grantee = () => {

    const[lists,setList] = useState([]);
    const [projectname, setProjectName] = useState("");
    const [projectdesc, setProjectDesc] = useState("");
    const [goalamount, setGoalAmount] = useState(null);
    const [time, setTime] = useState(null);
    const [daixbal, setDaixbal] = useState(null);           
    const [video, setVideo] = useState('')

    const{data:signer}=useSigner();
    const provider = useProvider()
    const contract = new ethers.Contract('0xBEd8bbDFcFed5e59b3f06295175587bc35cCf138',FundABI,signer);
  
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

    // fundDetails();

    const {
        mutate: createAsset,
        data: assets,
        status,
        progress,
        error,
      } = useCreateAsset(
        video
          ? {
              sources: [{ name: video.name, file: video }] ,
            }
          : null,
      );

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

    const handleUpload = async() => {
        createAsset();
    }

    return (
    <div>
        <div className='border-b border-b-grey1'>
            <GranteeNav/>
        </div>

        <div className='flex flex-row pl-[80px]'>
            <div className='w-[30%] h-[100vh] border-r border-r-grey1 pt-[30px]'>
                <div className='flex flex-col text-left border border-blue2 mr-[80px] px-[10px] py-[30px] rounded-xl shadow-2xl bg-white1'>
                    <label className='text-3xl font-poppins text-blue1 font-semibold pb-[30px]'>Project Details</label>
                    <label className='text-sm font-poppins'>Name of Project</label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px] pl-[10px]' placeholder='Name' value={projectname} onChange={(e) => setProjectName(e.target.value)}/>                    
                    <label className='text-sm font-poppins pt-[20px]'>Project Description</label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[100px] pl-[10px]' placeholder='Description' value={projectdesc} onChange={(e) => setProjectDesc(e.target.value)}/>
                    <label className='text-sm font-poppins pt-[20px]'>Goal Amount</label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px] pl-[10px]' placeholder='0.00' value={goalamount} onChange={(e) => setGoalAmount(e.target.value)}/>
                    <label className='text-sm font-poppins pt-[20px]'>Time of Completion</label>
                    <input className='bg-white1 border border-blue1 rounded-md h-[50px] pl-[10px]' placeholder='0 months' value={time} onChange={(e) => setTime(e.target.value)}/>
                    <label className='text-sm font-poppins pt-[20px]'>Demo Video Link </label>
                    <div className='flex flex-row'>
                        <input className='bg-white1 mt-[5px]' type="file" multiple={false} onChange={(e) => setVideo(e.target.files[0])}/>
                        <button disabled={status === 'loading' || !createAsset} onClick={handleUpload} className=' bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] '>Upload</button>
                        {/* {assets.map((asset) => (
                        <div key={asset.id}>
                            <div>
                            <div>Asset Name: {asset.name}</div>
                            <div>Playback URL: {asset.playbackUrl}</div>
                            <div>IPFS CID: {asset.storage.ipfs.cid ?? 'None'}</div>
                            </div>
                        </div>
                        ))} */}
                        {error && <div>{error.message}</div>}
                    </div>
                </div>

                <div className='mr-[80px]'>
                    <button onClick={projectdetails} className='mt-[30px] bg-blue1 font-poppins text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Submit</button>
                </div>
            </div>

            <div className='w-[70%] flex flex-col  px-[40px]'>
                <div className='flex flex-row pt-[20px] justify-between'>
                    <label className='text-3xl font-poppins text-blue1 font-semibold '>Your Existing Projects</label>
                    <div className='font-poppins text-blue1 font-medium text-lg mt-[5px]'>
                        <label>Total Collection : </label>
                        {/* {Number(ethers.utils.formatEther(daixbal)).toFixed(8)} */}
                    </div>
                </div>
                <div>
                    <button onClick={getlist} className='mt-[30px] border bg-white1 text-blue1 hover:bg-blue1 font-poppins hover:text-white1 shadow-2xl rounded-lg px-[20px] py-[10px]'>Show Projects</button>
                </div>
                <div className="grid gap-4 grid-cols-3 grid-rows-3 mt-[40px]">
                {
                    lists.map((list) => {
                        if(list.proj_name !== '')
                        {
                            return(
                                <div className='border border-blue1 rounded-2xl text-left bg-white1 shadow-xl'>
                                    <div className='flex flex-col justify-center p-5'>
                                        <label className='text-3xl font-poppins text-blue1 font-semibold '>{list.proj_name}</label>
                                        <label className='text-md font-poppins text-blue1 font-semibold pt-[20px]'>Desc : {list.proj_desc}</label>
                                        <div className='flex flex-row justify-between'>
                                            <label className='text-sm font-poppins text-blue1 font-semibold pt-[20px]'>Goal : {(list.goalAmount).toString()} fDAIx</label>
                                            <label className='text-sm font-poppins text-blue1 font-semibold pt-[20px]'>Time : {(list.time).toString()} months</label>
                                        </div>
                                    </div>
                                </div>
                            )       
                        }
                    })
                }  
            </div>
            </div>
        </div>
    </div>
  )
}

export default Grantee