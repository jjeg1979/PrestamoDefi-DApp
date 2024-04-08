import { ConnectKitButton } from 'connectkit'
import { Navbar } from '../components'
import { useAccount } from 'wagmi'

export default function Header() {

    const { isConnected } = useAccount()

    return (
      <header className="py-2 px-3 sm:py-4 sm:px-8 flex justify-between items-center bg-white border-b shadow-xs ">
        {/* Logo para version mobile */}
        <img src="../blockmaker-small-logo.png" alt="blockmaker-mobile-logo" width={47} className="sm:hidden" />
        {/* Logo para version desktop */}
        <img src="../blockmaker-full-logo.png" alt="blockmaker-desktop-logo" width={300} className="hidden sm:flex" />        
        {/* Botton de conexion wallet con prop showBalance para mostrar balance cuenta */}
        { isConnected ? (<Navbar />) : (null) }
        
        <ConnectKitButton showBalance />        
      </header>
    )
  }