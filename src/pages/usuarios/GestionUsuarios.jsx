import { useAccount } from 'wagmi'
import { SocioPrincipal, TotalLoanBalance } from '../../components/ui'
import { AltaPrestamista, AltaCliente}  from '../usuarios'

export default function GestionUsuarios() {

    const { isConnected } = useAccount()

   
    return (
      <div className="flex flex-col self-center sm:grid place-items-center px-3 py-16 md:px-5 gap-12">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl mb-2 bg-gradient-to-r from-indigo-600 to-green-400 text-transparent bg-clip-text">
        Blockmaker PrestamosDeFi DApp
      </h1>

      {isConnected ? (
        <>
          <TotalLoanBalance />
          <SocioPrincipal />
          <AltaPrestamista />
          <AltaCliente />
        </>
      ) : (
        <>
          
        </>
      )}
      </div>
    )
  }