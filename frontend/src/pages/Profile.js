import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import Marketplaceabi from "../../abi/Marketplaceabi.json"
import { Box, Grid, Text } from '@chakra-ui/react';
import NFTCard from '@/components/NFTCard';

export default function Profile () {
    //const marketplaceContract = useMarketplaceContract();
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    async function getNFTData(tokenId) {
      const ethers = require("ethers");
      let sumPrice = 0;
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();

      //Pull the deployed contract instance
      let contract = new ethers.Contract("0xc49e0E80aF12a0937881461609b6EFFe3fFb977B", Marketplaceabi, signer)

      //create an NFT Token
      let transaction = await contract.getMyNFTs()

      /*
      * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
      * and creates an object of information that is to be displayed
      */
      
      const items = await Promise.all(transaction.map(async i => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          let meta = await axios.get(tokenURI);
          meta = meta.data;

          let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
          let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.image,
              name: meta.name,
              description: meta.description,
          }
          sumPrice += Number(price);
          return item;
      }))

      updateData(items);
      updateFetched(true);
      updateAddress(addr);
      updateTotalPrice(sumPrice.toPrecision(3));
  }

    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);

        return (
            <Box className="profileClass" minHeight="100vh">
              <Box className="profileClass">
                <Box textAlign="center" mt={11} fontSize="2xl" color="white">
                  <Box mb={5}>
                    <Text fontWeight="bold">Wallet Address</Text>
                    <Text>{address}</Text>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  textAlign="center"
                  justifyContent="center"
                  mt={10}
                  fontSize="2xl"
                  color="white"
                >
                  <Box>
                    <Text fontWeight="bold">No. of NFTs</Text>
                    <Text>{data.length}</Text>
                  </Box>
                  <Box marginLeft={20}>
                    <Text fontWeight="bold">Total Value</Text>
                    <Text>{totalPrice} MATIC</Text>
                  </Box>
                </Box>
                <Box textAlign="center" alignItems="center" mt={11} color="white">
                  <Text fontWeight="bold">Your NFTs</Text>
                  <Box display="flex" justifyContent="center" flexWrap="wrap" maxWidth="screen-xl">
                    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="4">
                      {data.map((value, index) => {
                          return <NFTCard data={value} key={index} />;
                      })}
                    </Grid>
                  </Box>
                  <Box mt={10} fontSize="xl">
                    {data.length === 0 ? "Oops, No NFT data to display (Are you logged in?)" : ""}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
};