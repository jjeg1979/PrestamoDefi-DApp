import { PrestamoDefiABI } from '../../contracts/ABIs'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { TextInput, Title, Button } from '../../components/ui'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Web3 from 'web3'

export default function SolicitarPrestamo() {

    const toSeconds = (months) => months * 12 * 30 * 24 * 60 * 60;

    const [monto, setMonto] = useState('')
    const [plazo, setPlazo] = useState('')

    const web3 = new Web3(window.ethereum)

    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
        abi: PrestamoDefiABI,
        functionName: 'solicitarPrestamos',
        enabled: monto > 0,
        args: [web3.utils.toWei(monto, 'ether'), toSeconds(plazo)]
    });

    const handleMontoChange = (event) => {
        setMonto(event.target.value);
    };

    const handlePlazoChange = (event) => {
        setPlazo(event.target.value);
    };

    const { data: writeData, write } = useContractWrite(config)

    const {
        isError: isSolicitarPrestamoError,
        isLoading: isSolicitarPrestamoLoading,
        isSuccess: isSolicitarPrestamoSuccess,
    } = useWaitForTransaction({
        hash: writeData?.hash,
    });

    useEffect(() => {
        if (isSolicitarPrestamoSuccess) {
            toast.success('Préstamo solicitado con éxito')
            setMonto('')
            setPlazo('')
        }

        if (isSolicitarPrestamoError) {
            toast.error('Error al solicitar el préstamo')
        }
    } , [isSolicitarPrestamoSuccess, isSolicitarPrestamoError])

    return (
         <section className="bg-white p-4 border shadow w-fit rounded-lg text-sm space-y-2">
            <Title>Solicitar Préstamo</Title>

            <form className="grid gap-2"action="">
                <TextInput 
                    label="Monto" 
                    onChange={handleMontoChange}
                    placeholder="monto" 
                    type="number"
                    value={monto}
                />

                 <TextInput 
                    label="Plazo" 
                    onChange={handlePlazoChange}
                    placeholder="plazo (meses)" 
                    type="number"
                    value={plazo}
                />
                

                <Button 
                    onClick={() => write?.()} 
                    disabled={!monto || !plazo || isSolicitarPrestamoLoading}
                    isLoading={isSolicitarPrestamoLoading}
                >{isSolicitarPrestamoLoading ? "Solicitando Pr´stamo..." : "Solicitar Prétamo"}</Button>
            </form>
        </section>
    );

}