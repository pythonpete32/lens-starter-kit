import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, chain.polygon],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
      priority: 0,
    }),
    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
})
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})
