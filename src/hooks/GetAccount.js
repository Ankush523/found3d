import React from 'react';
import { useAccount } from 'wagmi';

const GetAccount = () => {
    const{data}=useAccount();
    return data?.address
}
 
export default GetAccount;
