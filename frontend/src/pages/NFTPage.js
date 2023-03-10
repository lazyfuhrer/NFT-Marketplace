import { useParams } from 'react-router-dom';
import Marketplaceabi from "../../abi/Marketplaceabi.json"
import axios from "axios";
import { useState } from "react";
import { Box, Button, Image } from '@chakra-ui/react';

export default function NFTPage (props) {

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
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
        price: meta.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
    }
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr)
    updateCurrAddress(addr);
}

async function buyNFT(tokenId) {
    try {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract("0xc49e0E80aF12a0937881461609b6EFFe3fFb977B", Marketplaceabi, signer);
        console.log(contract)
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

    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);

    return(
        <Box minH="100vh">
            <Box display="flex" ml="20" mt="20">
                <Box w="2/5">
                    <Image src={data.image} alt="" />
                    </Box>
                    <Box ml="20" textAlign="left" color="white" boxShadow="2xl" borderRadius="lg" border="2" p="5">
                    <Box fontSize="xl" fontWeight="bold" mb="4">
                        Name: {data.name}
                    </Box>
                    <Box mb="4">Description: {data.description}</Box>
                    <Box mb="4">
                        Price: <span>{data.price} ETH</span>
                    </Box>
                    <Box mb="4">
                        Owner: <span fontSize="sm">{data.owner}</span>
                    </Box>
                    <Box mb="4">
                        Seller: <span fontSize="sm">{data.seller}</span>
                    </Box>
                    <Box>
                        {currAddress === data.owner || currAddress === data.seller ? (
                        <Button
                            className="enableEthereumButton"
                            bg="blue.500"
                            _hover={{ bg: "blue.700" }}
                            color="white"
                            fontWeight="bold"
                            py="2"
                            px="4"
                            rounded="md"
                            fontSize="sm"
                            onClick={() => buyNFT(tokenId)}
                        >
                            Buy this NFT
                        </Button>
                        ) : (
                        <Box color="emerald.700">You are the owner of this NFT</Box>
                        )}
                        <Box color="green" textAlign="center" mt="3">
                        {message}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}