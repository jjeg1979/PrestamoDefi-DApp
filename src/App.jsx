import { AppLayout } from './components/ui/layouts'
import Home from './pages/landing/Home'
import { WagmiConfig } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { config } from './config/wagmi'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import { GestionUsuarios } from './pages/usuarios'
import { GestionPrestamos } from './pages/prestamos'

function App() {
  return (
    <WagmiConfig config={config}>
      <Toaster position="bottom-right"/>
      {/* Lo ponemos en modo light ya que construiremos la aplicación en modo claro */}
      <ConnectKitProvider mode="light">
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<GestionUsuarios />} />
            <Route path="/prestamos" element={<GestionPrestamos />} />
          </Routes>
          <Home />
        </AppLayout>
      </ConnectKitProvider>
    </WagmiConfig>    
  )
}

export default App
