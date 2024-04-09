import { useAccount, useContractRead } from 'wagmi'
import { ErrorInfo, SocioPrincipal, TotalLoanBalance } from '../../components/ui'
import { PrestamoDefiABI } from '../../contracts/ABIs'
import DepositarGarantia from './DepositarGarantia';
import SolicitarPrestamo from './SolicitarPrestamo';
import AprobarPrestamo from './AprobarPrestamo';
import ReembolsarPrestamo from './ReembolsarPrestamo';
import LiquidarGarantia from './LiquidarGarantia';


export default function GestionPretamos() {

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
            <DepositarGarantia />
            <LiquidarGarantia />
            <SolicitarPrestamo />
            <AprobarPrestamo />
            <ReembolsarPrestamo />
        </>
      ) : (
        <>
            <ErrorInfo message="Por favor, autentíquese como Socio Principal para poder gestionar los usuarios" />   
        </>
      )}
      </div>
    )
  }