import { Box ,Flex,Text} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import pixelpond from "public/pixelpond.png";

export default function Navbar() {
    return (
      <><Flex  as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem" >
       <Text
        fontWeight={700}
        fontSize={'2xl'}
        
        textAlign={[ 'left', 'center' ]}
       
              color={"#0A14D6"}
              backgroundImage="linear-gradient(to bottom ,#865DFF,#E2D3FF)"
              backgroundClip="text"
              textFillColor="transparent"
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'gray.700',
                zIndex: -1,
              }}
      >
        P I X E L P O N D</Text>
  
       <Flex justify="flex-end" align="center" flex="1" paddingRight="1.5rem">
        <ConnectButton        
              
              />
        </Flex>
        </Flex>
      </>
    )
  }