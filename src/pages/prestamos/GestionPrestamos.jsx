import { useAccount, useContractRead } from 'wagmi'
import { ErrorInfo, SocioPrincipal, TotalLoanBalance } from '../../components/ui'
import { PrestamoDefiABI } from '../../contracts/ABIs'
import DepositarGarantia from './DepositarGarantia';
import SolicitarPrestamo from './SolicitarPrestamo';
import AprobarPrestamo from './AprobarPrestamo';
import ReembolsarPrestamo from './ReembolsarPrestamo';
import LiquidarGarantia from './LiquidarGarantia';
import PrestamosCliente from './PrestamosCliente';


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
        <div className="flex flex-col gap-12 place-items-center">            
            <TotalLoanBalance />
            <SocioPrincipal />
            <div className="grid grid-rows-3 grid-flow-col gap-6 place-items-center">
              <DepositarGarantia />
              <LiquidarGarantia />
              <div className="grid grid-rows-subgrid gap-6 row-span-3">
                <div className="row-start-2">
                  <SolicitarPrestamo />
                </div>
              <AprobarPrestamo />
              <ReembolsarPrestamo />
              </div>
            </div>
            <PrestamosCliente />
        </div>
      ) : (
        <>
            <ErrorInfo message="Por favor, autentíquese como Socio Principal para poder gestionar los usuarios" />   
        </>
      )}
      </div>
    )
  }