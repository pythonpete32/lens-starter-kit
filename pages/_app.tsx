import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '../lib/wagmiClient'
import { Toaster } from 'react-hot-toast'
import Layout from './Layout'
import { Sono } from '@next/font/google'

const sono = Sono({
  subsets: ['latin'],
  variable: '--font-sono',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sono.variable} font-sans`}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
          <Toaster position="bottom-right" reverseOrder={false} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  )
}

export default MyApp
