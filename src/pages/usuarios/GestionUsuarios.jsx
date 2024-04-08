import { useAccount, useContractRead } from 'wagmi'
import { ErrorInfo, SocioPrincipal, TotalLoanBalance } from '../../components/ui'
import { AltaPrestamista, AltaCliente}  from '../usuarios'
import { PrestamoDefiABI } from '../../contracts/ABIs'


export default function GestionUsuarios() {

    const { address, isConnected } = useAccount()

    const { data } = useContractRead({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: PrestamoDefiABI,
    functionName: 'socioPrincipal',
    }); 

    return (
      <div className="flex flex-col self-center sm:grid place-items-center px-3 py-16 md:px-5 gap-12">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl mb-2 bg-gradient-to-r from-indigo-600 to-green-400 text-transparent bg-clip-text">
        Blockmaker PrestamosDeFi DApp
      </h1>

      {isConnected && (address === data) ? (
        <>
            
          <TotalLoanBalance />
          <SocioPrincipal />
          <AltaPrestamista />
          <AltaCliente />
        </>
      ) : (
        <>
            <ErrorInfo message="Por favor, autentíquese como Socio Principal para poder gestionar los usuarios" />   
        </>
      )}
      </div>
    )
  }