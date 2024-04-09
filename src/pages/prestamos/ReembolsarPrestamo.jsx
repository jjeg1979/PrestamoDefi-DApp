import { PrestamoDefiABI } from "../../contracts/ABIs"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { TextInput, Title, Button } from "../../components/ui"
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function ReembolsarPrestamo() {
    const [idPrestamo, setIdPrestamo] = useState('')

   

    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
        abi: PrestamoDefiABI,
        functionName: 'reembolsarPrestamo',
        enabled: idPrestamo > 0,  
        args: [idPrestamo]
    })

    const handleIdPrestamoChange = (event) => {
        setIdPrestamo(event.target.value);
    };

    const { data: writeData, write } = useContractWrite(config)

    const {
        isError: isReembolsarPrestamoError,
        isLoading: isReembolsarPrestamoLoading,
        isSuccess: isReembolsarPrestamoSuccess,
    } = useWaitForTransaction({
        hash: writeData?.hash,
    })

    useEffect(() => {
        if (isReembolsarPrestamoSuccess) {
            toast.success('Garantía depositada con éxito')
            setIdPrestamo('')
        }

        if (isReembolsarPrestamoError) {
            toast.error('Error al depositar la garantía')
        }
    }, [isReembolsarPrestamoSuccess, isReembolsarPrestamoError])

    return (
        <section className="bg-white p-4 border shadow w-fit rounded-lg text-sm space-y-2">
            <Title>Reembolsar Préstamo</Title>

            <form className="grid gap-2"action="">
                <TextInput 
                    label="Garantía" 
                    onChange={handleIdPrestamoChange}
                    placeholder="id prestamo" 
                    type="number"
                    value={idPrestamo.toString()}
                />

                <Button 
                    onClick={() => write?.()} 
                    disabled={!idPrestamo || isReembolsarPrestamoLoading}
                    isLoading={isReembolsarPrestamoLoading}
                >{isReembolsarPrestamoLoading ? "Depositando Garantía..." : "Depositar Garantía"}</Button>
            </form>
        </section>
    )
}