import { ChakraProvider } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css';
import theme from "../styles/theme";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, optimism, arbitrum, goerli, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Navbar from '@/components/Navbar';

const { chains, provider } = configureChains(
  [polygonMumbai, goerli, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: "DhZofW7i31Pskbr7kzmQEtNXiU28sbJZ" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'NFT Marketplace',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme()} coolMode chains={chains}>
          <Navbar/>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  ) 
}
