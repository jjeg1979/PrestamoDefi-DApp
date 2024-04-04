import { useAccount } from 'wagmi'
import { LoadingSpinner, Button } from '../components/ui'

export default function Home() {

    const { address, isConnecting, isDisconnected } = useAccount()

    if (isConnecting) return <div>Connecting...</div>
    if (isDisconnected) return <div>Disconnected</div>
    return (
      <div className="flex flex-col justify-between">
        <div>Connected Wallet: {address}</div>
        <LoadingSpinner className="h-12 w-12"/>
        <div>
          <Button isLoading={isConnecting}>Comprar Tokens..</Button> 
        </div>
      </div>
    )
  }