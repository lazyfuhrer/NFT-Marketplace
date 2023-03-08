import { Button } from "@chakra-ui/react";
import useMarketplaceContract from "hooks/useMarketplaceContract";
import { ethers } from 'ethers';

export default function Home() {

  const marketplaceContract = useMarketplaceContract();

  console.log(marketplaceContract);

  return (
    <>
      
    </>
  )
}