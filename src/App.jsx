import { AppLayout } from './components/ui/layouts'
import Home from './pages/Home'
import { WagmiConfig } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { config } from './config/wagmi'

function App() {
  return (
    <WagmiConfig config={config}>
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
