import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { AppKitNetwork, arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { ReactNode } from 'react'

interface AppKitProviderProps {
  children: ReactNode
}

// 0. Setup queryClient
const queryClient = new QueryClient()
;

// 1. Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_CONNECT_WALLET_ID

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  },
  themeVariables: {
    '--w3m-border-radius-master': '0', 
    '--w3m-accent': '#3a1e09',
  }
})

export function AppKitProvider({ children }: AppKitProviderProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}