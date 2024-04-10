import { AppLayout } from './components/ui/layouts'
import Home from './pages/landing/Home'
import { WagmiConfig } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { config } from './config/wagmi'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import { GestionUsuarios } from './pages/usuarios'
import { GestionPrestamos } from './pages/prestamos'
import { PublicRoutes } from './utils/routes'
import PrivateRoutesGuard from './components/guards/PrivateRoutesGuard'

function App() {
  return (
    <WagmiConfig config={config}>
      <Toaster position="bottom-right"/>
      {/* Lo ponemos en modo light ya que construiremos la aplicación en modo claro */}
      <ConnectKitProvider mode="light">
        <AppLayout>
          <Routes>
            <Route path={PublicRoutes.HOME} element={<Home />} />
            <Route path={PublicRoutes.NOT_FOUND} element={<h1>404 - Not Found</h1>} />
            <Route path={PublicRoutes.USERS} element={<GestionUsuarios />} />
            <Route path={PublicRoutes.LOANS} element={<GestionPrestamos />} />
            <Route element={<PrivateRoutesGuard/>}  />
              <Route path={PublicRoutes.HOME} element={<Home />} />            
          </Routes>
        </AppLayout>
      </ConnectKitProvider>
    </WagmiConfig>    
  )
}

export default App
