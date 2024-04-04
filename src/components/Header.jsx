import { ConnectKitButton } from 'connectkit'

export default function Header() {
    return (
      <header className="py-2 px-3 sm:py-4 sm:px-8 flex justify-between items-center bg-white border-b shadow-xs">
        {/* Logo para version mobile */}
        <img src="../blockmaker-small-logo.png"
        alt="blockmaker-mobile-logo" width={47} className="sm:hidden" />
        {/* Logo para version desktop */}
        <img src="../blockmaker-full-logo.png" alt="blockmaker-desktop-logo" width={300} className="hidden sm:flex" />
        {/*<button className="bg-gray-100 rounded-xl px-2 text-sm h-fit py-2">Connect Wallet </button> */}
        {/* Botton de conexion wallet con prop showBalance para mostrar balance cuenta */}
      <ConnectKitButton showBalance />
      </header>
    )
  }