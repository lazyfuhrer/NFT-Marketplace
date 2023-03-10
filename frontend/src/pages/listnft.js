import React, { useState } from 'react';
import {
  Progress,
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";
import Marketplaceabi from "../../abi/Marketplaceabi.json"
import { useRouter } from 'next/router';

export default function ListNFT() {

    const router = useRouter();
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        try {
            
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    
    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
       
        if( !name || !description || !price || !fileURL)
            return;

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        
        try {
            const metadataURL = await uploadMetadataToIPFS();
           
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Please wait.. uploading (upto 5 mins)")

           
            let contract = new ethers.Contract("0xc49e0E80aF12a0937881461609b6EFFe3fFb977B", Marketplaceabi, signer)

           
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your NFT!");
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            router.push('/Profile');
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }

    console.log("Working", process.env);


  return (
    <>
    <Box mt={'10'} alignItems="center" display="flex">
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress
          hasStripe
          value={'50'}
          mb="5%"
          mx="5%"
          isAnimated>
        </Progress>

      <Heading fontSize={'20px'} w="100%" textAlign={'center'} fontWeight="normal" mb="13%">
        Upload your NFT to the marketplace
      </Heading>

      <FormControl mr="5%">
        <FormLabel htmlFor="name" fontWeight={'normal'}>
          Name
        </FormLabel>
        <Input id="name" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name} />
      </FormControl>

      <FormControl mt={1}>
          <FormLabel
            htmlFor="description"
            mt={'5'}
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
              Description
          </FormLabel>
          <Textarea
            id="description"
            placeholder="cyberpunk bored ape"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
            value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}
          />
          <FormHelperText>
            Brief description for your NFT.
          </FormHelperText>
        </FormControl>

        <FormControl mt={'1'}>
          <FormLabel
            htmlFor="price"
            mt={'5'}
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Price
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md">
              MATIC
            </InputLeftAddon>
            <Input
              type="number"
              step={'0.01'}
              placeholder="Minimum 0.01"
              focusBorderColor="brand.400"
              rounded="md"
              value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}
            />
          </InputGroup>
        </FormControl>
      
      <FormControl mt="2%">
        <FormLabel htmlFor="image" mt={'5'} fontWeight={'normal'}>
            Upload Image
        </FormLabel>
        <Input type="file" onChange={OnChangeFile} />
      </FormControl>

      <Box>{message}</Box>

      <Flex w="100%" mt="6" justifyContent="space-between">
        <Button
          w="full"
          colorScheme="red"
          variant="solid"
          onClick={listNFT}>
          List NFT
        </Button>
      </Flex>
      </Box>
      </Box>  
    </>
  );
};