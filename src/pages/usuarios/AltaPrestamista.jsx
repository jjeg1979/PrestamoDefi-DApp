import { PrestamoDefiABI } from "../../contracts/ABIs"
import { TextInput, Title, Button } from "../../components/ui"
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function AltaPrestamista() {
    const [nuevoPrestamista, setNuevoPrestamista] = useState('')
   
    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
        abi: PrestamoDefiABI,
        functionName: 'altaPrestamista',
        enabled: nuevoPrestamista,
        args: [nuevoPrestamista]
    })  


    {/* FUNCIÓN  PARA MANEJAR EL USO DEL BOTÓN */}
    const handleAdressChange = (event) => {
        setNuevoPrestamista(event.target.value);
    }

    const { data: writeData, write } = useContractWrite(config)
    
    const { 
        isError: isAltaPrestamistaError,
        isLoading: isAltaPrestamistaLoading,
        isSuccesss: isAltaPrestamistaSuccess,
    } = useWaitForTransaction({        
        hash: writeData?.hash,
    })
    
    useEffect(() => {
        if (isAltaPrestamistaSuccess) {
            toast.sucess('Prestamista dado de alta con éxito')
            setNuevoPrestamista('')
        }

        if (isAltaPrestamistaError) {
            toast.error('Error al dar de alta el prestamista')
        }
    }, [isAltaPrestamistaSuccess, isAltaPrestamistaError])

    return (
        <section className="bg-white p-4 border shadow w-fit rounded-lg text-sm space-y-2">
            <Title>Alta Prestamista</Title>

            <form className="grid gap-2"action="">
                <TextInput 
                    label="Dirección" 
                    placeholder="address" 
                    type="string"
                    onChange={handleAdressChange} 
                    value={nuevoPrestamista}
                />

                <Button 
                    onClick={() => write?.()} 
                    disabled={!nuevoPrestamista || isAltaPrestamistaLoading}
                    isLoading={isAltaPrestamistaLoading}
                >{isAltaPrestamistaLoading ? "Dando de Alta Prestamista..." : "Dar de Alta"}</Button>
            </form>
        </section>
    )
}