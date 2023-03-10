import { Box, Button, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Marketplaceabi from "../../../abi/Marketplaceabi.json"

export default function Work() {
  const {query} = useRouter()
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract("0xc49e0E80aF12a0937881461609b6EFFe3fFb977B", Marketplaceabi, signer)
    //console.log(contract);
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    //console.log(listedToken);
    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    }
    //console.log(item);
    updateData(item);
    updateDataFetched(true);
    //console.log("address", addr)
    updateCurrAddress(addr);
  }

  async function buyNFT(tokenId) {
    try {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract("0xc49e0E80aF12a0937881461609b6EFFe3fFb977B", Marketplaceabi, signer)
        const salePrice = ethers.utils.parseUnits(data.price, 'ether')
        updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
        //run the executeSale function
        let transaction = await contract.executeSale(tokenId, {value:salePrice});
        await transaction.wait();

        alert('You successfully bought the NFT!');
        updateMessage("");
    }
    catch(e) {
        alert("Upload Error"+e)
    }
}

  // Call getNFTData automatically when the component mounts
  useEffect(() => {
    if (query.id) {
      getNFTData(query.id);
    }
  }, [query.id]);

  return (
    <Box minH="100vh">
      <Box display="flex" ml={20} mt={20}>
        <Image src={data.image} alt="" w="40%" />
        <Box
          textAlign="left"
          fontSize="xl"
          color="white"
          boxShadow="2xl"
          rounded="lg"
          borderWidth="2px"
          p={5}
          ml={20}
          mt={0}
        >
          <Text>Name: {data.name}</Text>
          <Text>Description: {data.description}</Text>
          <Text>
            Price: <Box as="span">{data.price} ETH</Box>
          </Text>
          <Text>
            Owner: <Box as="span" fontSize="sm">{data.owner}</Box>
          </Text>
          <Text>
            Seller: <Box as="span" fontSize="sm">{data.seller}</Box>
          </Text>
          <Text>
            Current addr: <Box as="span" fontSize="sm">{currAddress}</Box>
          </Text>
          {currAddress == data.owner || currAddress == data.seller ? (
            <Text color="emerald.700">You are the owner of this NFT</Text>
          ) : (
            <Button
              bg="blue.500"
              _hover={{ bg: "blue.700" }}
              color="white"
              fontWeight="bold"
              py={2}
              px={4}
              rounded="md"
              fontSize="sm"
              onClick={() => buyNFT(query.id)}
            >
              Buy this NFT
            </Button>
          )}
          <Text color="green" textAlign="center" mt={3}>
            {message}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
