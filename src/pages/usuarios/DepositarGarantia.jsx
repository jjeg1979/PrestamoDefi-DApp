import { PrestamoDefiABI } from "../../contracts/ABIs"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ValueInput, Title, Button } from "../../components/ui"
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function DepositarGarantia() {
    const [garantia, setGarantia] = useState(0)

    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
        abi: PrestamoDefiABI,
        functionName: 'depositarGarantia',
        enabled: garantia > 0,
        args: []
    })

    const handleGarantiaChange = (event) => {
        setGarantia(event.target.value);
    };

    const { data: writeData, write } = useContractWrite(config)

    const {
        isError: isDepositarGarantiaError,
        isLoading: isDepositarGarantiaLoading,
        isSuccess: isDepositarGarantiaSuccess,
    } = useWaitForTransaction({
        hash: writeData?.hash,
    })

    useEffect(() => {
        if (isDepositarGarantiaSuccess) {
            toast.success('Garantía depositada con éxito')
            setGarantia('')
        }

        if (isDepositarGarantiaError) {
            toast.error('Error al depositar la garantía')
        }
    }, [isDepositarGarantiaSuccess, isDepositarGarantiaError])

    return (
        <section className="bg-white p-4 border shadow w-fit rounded-lg text-sm space-y-2">
            <Title>Depositar Garantía</Title>

            <form className="grid gap-2"action="">
                <ValueInput 
                    label="Garantía" 
                    placeholder="cantidad" 
                    onChange={handleGarantiaChange}
                    type="number"
                    value={garantia}
                />

                <Button 
                    onClick={() => write?.(garantia)} 
                    disabled={!garantia || isDepositarGarantiaLoading}
                    isLoading={isDepositarGarantiaLoading}
                >{isDepositarGarantiaLoading ? "Depositando Garantía..." : "Depositar Garantía"}</Button>
            </form>
        </section>
    )
}