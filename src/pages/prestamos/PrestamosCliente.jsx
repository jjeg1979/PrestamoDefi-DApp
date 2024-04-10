import { useContractReads, useContractRead, useAccount } from "wagmi";
import { PrestamoDefiABI } from "../../contracts/ABIs";
import { Title } from "../../components/ui";
import Web3 from 'web3';

const prestamoDeFiContract = {
  address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
  abi: PrestamoDefiABI,
};


export default function PrestamosCliente() {

    const { address } = useAccount()

    // Lectura de los ids de los préstamos del cliente

    const { data: idsPrestamosCliente } = useContractRead({
      ...prestamoDeFiContract,
      functionName: 'obtenerPrestamosPorPrestatario',
      args: [address]
    });

    // Construcción de las llamadas a useContractReads para obtener los detalles de los préstamos
    const consultasPrestamos = idsPrestamosCliente.map((id) => ({
      ...prestamoDeFiContract,
      functionName: 'obtenerDetallesDePrestamo',
      args: [address, id]
    }))    

    const { data: detallesPrestamosCliente } = useContractReads({
      contracts: consultasPrestamos
    });  

    return (
      <section className="bg-white p-4 border shadow w-fit rounded-lg text-sm space-y-2" >
        <Title>Préstamos Cliente</Title>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-indigo-800 text-center">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Préstamo id
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Monto (ETH)
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Plazo (días)
                  </th>
                  <th scope="col" className="px-6 py-3 text">
                      Aprobado
                  </th>
                  <th scope="col" className="px-6 py-3 text">
                      Reembolsado
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  
                  {detallesPrestamosCliente.map((prestamo, index) => (
                    <>
                      <th key={`${index.toString()+1}`} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        {(prestamo.result.id).toString()}
                      </th>                      
                      <td key={`${index.toString()+2}`} className="px-6 py-4 text-center">
                        {Web3.utils.fromWei(prestamo.result?.monto, 'ether')}
                      </td>
                      <td key={`${index.toString()+3}`} className="px-6 py-4 text-center">
                        {(prestamo.result?.plazo/BigInt('1036400')).toString()}
                      </td>
                      <td key={`${index.toString()+4}`} className="px-6 py-4 text-center">
                        {prestamo.result?.aprobado ? 'SÍ' : 'NO'}
                      </td>
                      <td key={`${index.toString()+5}`} className="px-6 py-4">
                        {prestamo.result?.reembolsado ? 'SÍ' : 'NO'}
                      </td>
                    </>               
                    ))}
                 
              </tr>
          </tbody>
    </table>
        
      </section>
    );
  }