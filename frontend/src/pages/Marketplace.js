import axios from "axios";
import { useState } from "react";
import Marketplaceabi from "../../abi/Marketplaceabi.json"
//import useMarketplaceContract from "hooks/useMarketplaceContract";
import { Box, Grid, Text } from "@chakra-ui/react";
import NFTCard from "@/components/NFTCard";

export default function Marketplace() {

    //const marketplaceContract = useMarketplaceContract();
    const sampleData = [
    {
        "name": "NFT#1",
        "description": "Alchemy's First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract("0xc49e0E80aF12a0937881461609b6EFFe3fFb977B", Marketplaceabi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
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
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

    return (
        <Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={20}>
            <Text fontSize="xl" fontWeight="bold" color="white">
              Top NFTs
            </Text>
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="4">
                {data.map((value, index) => {
                    return <NFTCard data={value} key={index} />;
                })}
            </Grid>
          </Box>
        </Box>
    );
}