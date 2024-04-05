import { AppLayout } from './components/ui/layouts'
import Home from './pages/landing/Home'
import { WagmiConfig } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { config } from './config/wagmi'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <WagmiConfig config={config}>
      <Toaster position="bottom-right"/>
      {/* Lo ponemos en modo light ya que construiremos la aplicación en modo claro */}
      <ConnectKitProvider mode="light">
        <AppLayout>
          <Home />
        </AppLayout>
      </ConnectKitProvider>
    </WagmiConfig>    
  )
}

export default App
