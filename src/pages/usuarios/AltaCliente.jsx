import { PrestamoDefiABI } from "../../contracts/ABIs"
import { TextInput, Title } from "../../components/ui"
import { usePrepareContractWrite, useWaitForTransaction, useContractWrite } from 'wagmi'
import { Button } from "../../components/ui"
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function AltaCliente() {
    const [nuevoCliente, setNuevoCliente] = useState('')
   
    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
        abi: PrestamoDefiABI,
        functionName: 'altaCliente',
        enabled: nuevoCliente,
        args: [nuevoCliente]
    })

    const handleAdressChange = (event) => {
        setNuevoCliente(event.target.value);
    }

    const { data: writeData, write } = useContractWrite(config)

    const {
        isError: isAltaClienteError,
        isLoading: isAltaClienteLoading,
        isSuccess: isAltaClienteSuccess,
    } = useWaitForTransaction({
        hash: writeData?.hash,
    })

    useEffect(() => {
        if (isAltaClienteSuccess) {
            toast.success('Cliente dado de alta con éxito')
            setNuevoCliente('')
        }

        if (isAltaClienteError) {
            toast.error('Error al dar de alta el cliente')
        }
    }, [isAltaClienteSuccess, isAltaClienteError])

    return (
        <section className="bg-white p-4 border shadow w-fit rounde-lg text-sm spyace-y-2">            
            <Title>Alta Cliente</Title>

            <form className="grid gap-2">
                <TextInput 
                    label="Dirección" 
                    placeholder="address" 
                    type="string"
                    onChange={handleAdressChange} 
                    value={nuevoCliente}
                /> 

                <Button
                    onClick={() => write?.()}
                    disabled={!nuevoCliente || isAltaClienteLoading}
                    isLoading={isAltaClienteLoading}
                >{isAltaClienteLoading ? "Dando de Alta Cliente..." : "Dar de Alta Cliente"}</Button>
            </form>
        </section>
    )
}