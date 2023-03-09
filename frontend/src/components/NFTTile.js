// import {
//     BrowserRouter as Router,
//     Link,
//   } from "react-router-dom";

import { Box, Image, Text } from "@chakra-ui/react";

function NFTTile (data) {
    // const newTo = {
    //     pathname:"/nftPage/"+data.data.tokenId
    // }
    return (
        // <Link to={newTo}>
        <Box borderWidth={2} ml={12} mt={5} mb={12} display="flex" flexDirection="column" alignItems="center" rounded="lg" w={{ base: "48", md: "72" }} boxShadow="2xl">
          <Image src={data.data.image} alt="" className="w-72 h-80 rounded-lg object-cover" />
          <Box bgGradient="linear(to-t, #454545, transparent)" w="full" p={2} roundedBottom="lg" pt={5} mt={-20}>
            <Text fontSize="xl" fontWeight="bold" color="white">
              {data.data.name}
            </Text>
            <Text color="white" display="inline">
              {data.data.description}
            </Text>
          </Box>
        </Box>
        // </Link>
      );
}

export default NFTTile;