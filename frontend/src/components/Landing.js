import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,Box,
    Center,
    useColorModeValue,
    Heading,
    SimpleGrid, Icon,
    Image,
    Card, CardHeader, CardBody, CardFooter, Divider
  } from '@chakra-ui/react';
import { useRouter } from 'next/router';

  const IMAGE1 =
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f187cf123542479.611f0bf0ccac8.jpg';

  const IMAGE2 =
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b0e4f2123542479.60f0519010164.jpg';
  export default function Landing() {

    const router = useRouter()

    return (
      <Flex
        w={'full'}
        h={'100vh'}
        // backgroundImage={
        //   'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3OmZTkKKe9e2Iso8R5aaEUSGPjowTyUzAIg&usqp=CAU)'
        // }
        backgroundSize={'cover'}
        backgroundPosition={'left center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
           Discover and own unique digital assets on <span as={"span"}
              color={"#0A14D6"}
              backgroundImage="linear-gradient(to bottom right,#09c6f9,##2F58CD)"
              backgroundClip="text"
              textFillColor="transparent">our NFT marketplace</span>
            </Text>
            
            <Text color={"gray.500"} >
           Become a part of the future
          </Text>
            <Stack direction={'row'}>
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              backgroundImage="linear-gradient(to bottom right,#FFF4D2,#FF0303)"
              _hover={{
                bg: "#FD8A8A",
              }}
              onClick={() => {
                router.push('/Marketplace')
              }}
            >
              Get Started
            </Button>
              
            </Stack>
            
          </Stack>
          
        </VStack>
       



    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={100}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE1})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE1}
          />
        </Box>
        
       
      </Box>
    </Center>
    
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-150}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE2})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE2}
          />
        </Box>
        
       
      </Box>
    </Center>
   
      </Flex>

    );
  }