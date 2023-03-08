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
    Card, CardHeader, CardBody, CardFooter, Divider, Grid
  } from '@chakra-ui/react';
  const IMAGE =
    'https://user-images.githubusercontent.com/80636305/126576577-cb07ba84-a4fe-4d63-b43a-e7832c77483d.png';



export default function Discover() {
    return (<> <Heading
        fontWeight={700}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"250%"}
        textAlign={[ 'left', 'center' ]}
       
              color={"#0A14D6"}
              backgroundImage="linear-gradient(to bottom right,#FBFFB1,#FF0303)"
              backgroundClip="text"
              textFillColor="transparent"
      >
        DASHBOARD </Heading>

        <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              Bishwarghya Biswas
            </Heading>
            
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>8</Text>
              <Text fontSize={'lg'} color={'gray.500'}>
                Assets
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>23  ETH</Text>
              <Text fontSize={'lg'} color={'gray.500'}>
                Balance
              </Text>
            </Stack>
          </Stack>
        

          <Heading
        fontWeight={500}
        fontSize={'2xl'}
        lineHeight={"500%"}
        textAlign={[ 'left', 'center' ]}
       
             
      >
        Trending 🔥 </Heading>
    <Center py={12}>
 
<Box display="grid" gridGap={2} gridAutoFlow="row dense">

<Grid gap={2} autoFlow="row dense">
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8555bc116147295.605c07d985be1.gif'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>The perfect latte</Heading>

      <Text py='2'>
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
      <Image rounded={'lg'}
            height={35}
            width={31}
            src={IMAGE} 
             />
             <Text fontWeight={600}>0.1 ETH</Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Collect ⚡
      </Button>
    </CardFooter>
  </Stack>
</Card>
</Grid>
<Grid gap={2} autoFlow="row dense">
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/ad55b5129002333.6161ca5983d3b.jpg'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>The perfect latte</Heading>

      <Text py='2'>
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
      <Image rounded={'lg'}
            height={35}
            width={31}
            src={IMAGE} 
             />
             <Text fontWeight={600}>0.1 ETH</Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Collect ⚡
      </Button>
    </CardFooter>
  </Stack>
</Card>
</Grid>
</Box>



</Center>
</>
    );
}