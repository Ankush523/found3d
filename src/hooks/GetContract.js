import React from 'react';
import { useContract } from 'wagmi';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useSigner } from 'wagmi';

const GetContract = () => {

    const{data:signer}=useSigner();

    const contract = useContract({
        addressOrName: '0xc8E786715A03dc989ee8246663c30298976309b3',
        contractInterface: FundABI,
        signerOrProvider: signer,
      })

    return contract;
}
export default GetContract;