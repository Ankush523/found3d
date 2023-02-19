import React from 'react';
import { useContract } from 'wagmi';
import FundABI from "../SmartContracts/ABIs/FundABI.json";
import { useSigner } from 'wagmi';

const GetContract = () => {

    const{data:signer}=useSigner();

    const contract = useContract({
        addressOrName: '0x84e628DE10ed5e077D6b0aC613661B2E73ab84f6',
        contractInterface: FundABI,
        signerOrProvider: signer,
      })

    return contract;
}
export default GetContract;