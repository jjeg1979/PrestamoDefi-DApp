import { useAccount } from 'wagmi'
import { LoadingSpinner, Button, ErrorInfo, TextInput, Title, SocioPrincipal } from '../components/ui'
import AltaPrestamista from './usuarios/AltaPrestamista'
import { AltaCliente } from './usuarios'

export default function Home() {

    const { address, isConnecting, isDisconnected } = useAccount()

    if (isConnecting) return <div>Connecting...</div>
    if (isDisconnected) return <div>Disconnected</div>
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