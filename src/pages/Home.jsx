import { useAccount } from 'wagmi'
import { LoadingSpinner, Button, ErrorInfo, TextInput, Title, SocioPrincipal } from '../components/ui'
import AltaPrestamista from './usuarios/AltaPrestamista'
import { AltaCliente } from './usuarios'
import { ConnectKitButton } from 'connectkit'

export default function Home() {

    const { isConnected } = useAccount()

   
    return (
      <div className="flex flex-col self-center sm:grid place-items-center px-3 py-16 md:px-5 gap-12">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl mb-2 bg-gradient-to-r from-indigo-600 to-green-400 text-transparent bg-clip-text">
        Blockmaker PrestamosDeFi DApp
      </h1>

      {isConnected ? (
        <>
          <SocioPrincipal />
          <AltaPrestamista />
          <AltaCliente />
        </>
      ) : (
        <>
          <p className="text-gray-500 md:text-xl text-center ">
            Una aplicación para que gente con ideas pero sin dinero pueda asociarse con gente que esté dispuesta a invertir en esas ideas.
            <br />
            Blockmaker PrestamosDeFi DApp ofrece transacciones rápidas, bajas tarifas y una plataforma segura.
            <br /> Ideal para proyectos de DeFi, juegos en blockchain y mucho más.
          </p>
          <p className="text-xl sm:text-2xl">🔒 Conecta tu wallet para comenzar.</p>
          <ConnectKitButton />
        </>
      )}
      </div>
    )
  }