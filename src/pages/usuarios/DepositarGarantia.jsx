import { PrestamoDefiABI } from "../../contracts/ABIs"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ValueInput, Title, Button } from "../../components/ui"
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Web3 from 'web3'

export default function DepositarGarantia() {
    const [garantia, setGarantia] = useState(0)

    const web3 = new Web3(window.ethereum)

    const { config } = usePrepareContractWrite({
        address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
        abi: PrestamoDefiABI,
        functionName: 'depositarGarantia',
        enabled: garantia > 0,  
        value: web3.utils.toWei(garantia, 'ether')
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
                    type="number"
                    value={garantia.toString()}
                />

                <Button 
                    onClick={() => handleGarantiaChange() && write?.()} 
                    disabled={!garantia || isDepositarGarantiaLoading}
                    isLoading={isDepositarGarantiaLoading}
                >{isDepositarGarantiaLoading ? "Depositando Garantía..." : "Depositar Garantía"}</Button>
            </form>
        </section>
    )
}