import { useAccount } from 'wagmi'
import { LoadingSpinner, Button, ErrorInfo, TextInput, Title, SocioPrincipal } from '../components/ui'
import AltaPrestamista from './usuarios/AltaPrestamista'
import { AltaCliente } from './usuarios'
import { ConnectKitButton } from 'connectkit'

export default function Home() {

    const { address, isConnecting, isDisconnected } = useAccount()

    if (isConnecting) return <div>Connecting...</div>
    if (isDisconnected) return (
      <div className="h-screen grid place-items-center">
        <div className="grid place-items-center gap-10">
          <h2 className="text-5xl text-indigo-500 font-bold">Aplicación de Prestamos DeFi</h2>
          <p className="text-xl text-gray-700 font-bold">Conecta tu wallet para interactuar con la DApp PretamoDeFi</p>
        <ConnectKitButton mode="dark" />
        </div>
      </div>
      )
    return (
      <div className="flex flex-col justify-between gap-6">
        <div>Connected Wallet: {address}</div>
        <LoadingSpinner className="h-12 w-12"/>
        <div>
          <Button isLoading={isConnecting}>Comprar Tokens</Button> 
        </div>
        <ErrorInfo message="Esto es un mensaje de error" />
        <div>
          <TextInput placeholder="Introduce nombre"/>
        </div>
        <div>
          <Title>Bienvenido a PrestamosDeFi</Title>
        </div>

        <SocioPrincipal />

        <AltaPrestamista />

        <AltaCliente />
      </div>
    )
  }