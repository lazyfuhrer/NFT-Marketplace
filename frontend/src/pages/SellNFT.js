import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";
import useMarketplaceContract from "hooks/useMarketplaceContract";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Spacer,
    Text,
    Textarea,
  } from "@chakra-ui/react";

export default function SellNFT () {

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

    console.log("Working", process.env);
    return (
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop="10"
          >
            <Box
              as="form"
              backgroundColor="white"
              boxShadow="md"
              borderRadius="md"
              paddingX="8"
              paddingY="8"
              marginBottom="4"
            >
              <Text
                as="h3"
                fontWeight="bold"
                color="purple.500"
                textAlign="center"
                marginBottom="8"
              >
                Upload your NFT to the marketplace
              </Text>
              <FormControl marginBottom="4">
                <FormLabel
                  color="purple.500"
                  fontSize="sm"
                  fontWeight="bold"
                  marginBottom="2"
                  htmlFor="name"
                >
                  NFT Name
                </FormLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Axie#4563"
                  value={formParams.name}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      name: e.target.value,
                    })
                  }
                  focusBorderColor="purple.500"
                  autoComplete="off"
                  color={'black'}
                  borderColor='gray'
                />
              </FormControl>
              <FormControl marginBottom="6">
                <FormLabel
                  color="purple.500"
                  fontSize="sm"
                  fontWeight="bold"
                  marginBottom="2"
                  htmlFor="description"
                >
                  NFT Description
                </FormLabel>
                <Textarea
                  id="description"
                  placeholder="Axie Infinity Collection"
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                  focusBorderColor="purple.500"
                  rows="5"
                  resize="none"
                  color={'black'}
                  borderColor='gray'
                />
              </FormControl>
              <FormControl marginBottom="6">
                <FormLabel
                  color="purple.500"
                  fontSize="sm"
                  fontWeight="bold"
                  marginBottom="2"
                  htmlFor="price"
                >
                  Price (in ETH)
                </FormLabel>
                <Input
                  id="price"
                  type="number"
                  placeholder="Min 0.01 ETH"
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      price: e.target.value,
                    })
                  }
                  focusBorderColor="purple.500"
                  step="0.01"
                  autoComplete="off"
                  color={'black'}
                  borderColor='gray'
                />
              </FormControl>
              <FormControl marginBottom="4">
                <FormLabel
                  color="purple.500"
                  fontSize="sm"
                  fontWeight="bold"
                  marginBottom="2"
                  htmlFor="image"
                >
                  Upload Image
                </FormLabel>
                <Input
                  id="image"
                  type="file"
                />
               </FormControl>
               <Spacer/>
               <Text textColor={'green'} textAlign="center">{message}</Text>
               <Button fontWeight={'bold'} mt="10" w={'full'} bg={'purple.500'} textColor='white'  p={'2'} borderRadius='md' shadow="lg" onClick={listNFT}>List NFT</Button>
            </Box>
          </Box>
        </Box>
      );
}