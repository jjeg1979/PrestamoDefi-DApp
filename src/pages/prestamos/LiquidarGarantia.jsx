import { PrestamoDefiABI } from '../../contracts/ABIs'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { TextInput, Title, Button } from '../../components/ui'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function LiquidarGarantia() {


    const [prestatario, setPrestatario] = useState('')
    const [prestamoId, setPrestamoId] = useState('')


    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
        abi: PrestamoDefiABI,
        functionName: 'solicitarPrestamos',
        enabled: prestatario > 0,
        args: [prestatario, prestamoId]
    });

    const handlePrestatarioChange = (event) => {
        setPrestatario(event.target.value);
    };

    const handlePrestamoIdChange = (event) => {
        setPrestamoId(event.target.value);
    };

    const { data: writeData, write } = useContractWrite(config)

    const {
        isError: isLiquidarGarantiaError,
        isLoading: isLiquidarGarantiaLoading,
        isSuccess: isLiquidarGarantiaSuccess,
    } = useWaitForTransaction({
        hash: writeData?.hash,
    });

    useEffect(() => {
        if (isLiquidarGarantiaSuccess) {
            toast.success('Garantía liquidada con éxito')
            setPrestatario('')
            setPrestamoId('')
        }

        if (isLiquidarGarantiaError) {
            toast.error('Error al liquidar la garantía')
        }
    } , [isLiquidarGarantiaSuccess, isLiquidarGarantiaError])

    return (
         <section className="bg-white p-4 border shadow w-fit rounded-lg text-sm space-y-2">
            <Title>Liquidar Garantía</Title>

            <form className="grid gap-2"action="">
                <TextInput 
                    label="DireccionPrestataario" 
                    onChange={handlePrestatarioChange}
                    placeholder="direccion cliente" 
                    type="string"
                    value={prestatario}
                />

                 <TextInput 
                    label="IdPrestamo" 
                    onChange={handlePrestamoIdChange}
                    placeholder="id prestamo" 
                    type="string"
                    value={prestamoId}
                />
                

                <Button 
                    onClick={() => write?.()} 
                    disabled={!prestatario || !prestamoId || isLiquidarGarantiaLoading}
                    isLoading={isLiquidarGarantiaLoading}
                >{isLiquidarGarantiaLoading ? "Solicitando Pr´stamo..." : "Solicitar Prétamo"}</Button>
            </form>
        </section>
    );
}