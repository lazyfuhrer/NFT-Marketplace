import { useState } from 'react';
import { Box, Image, Link, Heading, Text, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import NextLink from 'next/link'

const NFTCard = (data) => {
  const newTo = {
    pathname:"/nfts/"+data.data.tokenId
  }
  const bgColor = useColorModeValue('white', 'gray.700');
  const boxShadowColor = useColorModeValue('lg', 'dark-lg');
  const [isHearted, setIsHearted] = useState(false);

  const handleHeartClick = () => {
    setIsHearted(!isHearted);
  };

  const heartVariants = {
    unclicked: { scale: 1, fill: '#EDF2F7' },
    clicked: { scale: 1.2, fill: '#F56565' },
  };

  return (
    <Link as={NextLink} href={newTo}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={bgColor}
        boxShadow={boxShadowColor}
        _hover={{ transform: 'scale(1.05)', shadow: 'xl' }}
        transition="all 0.2s"
        cursor="pointer"
      >
        <Box position="relative">
          <Image crossOrigin='anonymous' src={data.data.image} alt={data.data.name} h="200px" w="100%" objectFit="cover" />
          <Flex
            justify="flex-end"
            position="absolute"
            top="2"
            right="2"
            bg={bgColor}
            px="2"
            py="1"
            borderRadius="lg"
            boxShadow={boxShadowColor}
          >
            <motion.div variants={heartVariants} animate={isHearted ? 'clicked' : 'unclicked'}>
              <IconButton
                aria-label="Favorite"
                icon={<AiOutlineHeart />}
                size="md"
                colorScheme="red"
                variant="ghost"
                onClick={handleHeartClick}
              />
            </motion.div>
          </Flex>
        </Box>
        <Flex p="4" justify="space-between">
          <Box>
            <Heading textAlign={'left'} size="md" mb="2" color={useColorModeValue('gray.700', 'white')}>
              {data.data.name}
            </Heading>
            <Text textAlign={'left'} fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')} lineHeight="tall" noOfLines={3}>
              {data.data.description}
            </Text>
          </Box>
          <Box>
            <Text textAlign={'right'} fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')} lineHeight="tall">
              {data.data.price} MATIC
            </Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default NFTCard;
