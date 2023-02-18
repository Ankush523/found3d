import * as React from 'react';
import { useBalance } from 'wagmi';
import GetAccount from './GetAccount';


const GetBalance = () => {

    const address = GetAccount();

    const { data, isError, isLoading } = useBalance({
        address: address,
    })

    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
    return (
      <div>
        Balance: {data?.formatted} {data?.symbol}
      </div>
    )
};

export default GetBalance;