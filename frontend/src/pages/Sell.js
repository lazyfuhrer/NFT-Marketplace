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
import useMarketplaceContract from 'hooks/useMarketplaceContract';

export default function multistep() {

    const marketplaceContract = useMarketplaceContract();
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
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

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
            return;

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
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

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            updateMessage("Please wait.. uploading (upto 5 mins)")

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await marketplaceContract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await marketplaceContract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your NFT!");
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            window.location.replace("/")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }

    console.log(marketplaceContract)

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
            isAnimated></Progress>

        <Heading fontSize={'20px'} w="100%" textAlign={'center'} fontWeight="normal" mb="13%">
          Upload your NFT to the marketplace
        </Heading>
      
        <FormControl mr="5%">
          
          <FormLabel htmlFor="name" fontWeight={'normal'}>
              NFT Name
          </FormLabel>
          <Input id="name" placeholder="Axie#4563" value={formParams.name}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        name: e.target.value,
                      })
          }/>
      
          <FormLabel
            htmlFor="description"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
                NFT Description
          </FormLabel>
          <Textarea
            id="description"
            placeholder="Axie Infinity Collection"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
            value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
          />
          <FormHelperText>
            Brief description for your NFT.
          </FormHelperText>
        
          <FormLabel
            htmlFor="price"
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
              step="0.01"
              placeholder="min 0.01"
              focusBorderColor="brand.400"
              rounded="md"
              value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      price: e.target.value,
                    })
                  }
            />
          </InputGroup>
        
          <FormLabel htmlFor="image" fontWeight={'normal'}>
            Upload Image
          </FormLabel>
          <Input type={'file'} onChange={OnChangeFile} />
          </FormControl>

          <Flex mt="6" w="100%" justifyContent="space-between">
            <Flex>
                <Button
                    w="7rem"
                    colorScheme="red"
                    variant="solid"
                    onClick={listNFT}>
                        List NFT
                </Button>
                
            </Flex>
          </Flex>
      </Box>
      </Box>
    </>
  );
}