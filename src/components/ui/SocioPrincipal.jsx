import { useContractRead } from 'wagmi';
import { PrestamoDefiABI } from '../../contracts/ABIs';
import { Title } from '../ui';
import PropTypes from 'prop-types';

function SocioPrincipalSkeleton() {
    return (
        <div className="bg-white border shadow px-3.5 py-5 rounded-md grid gap-2 w-[360px] sm:w-[469px]" >
            <div className="h-5 bg-gray-300 rounded animate-pulse w-20" />
            <div className="h-7 bg-gray-300 rounded animate-pulse" />
        </div>
    )
}

export default function SocioPrincipal() {
    const {data, isLoading} = useContractRead({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: PrestamoDefiABI,
    functionName: 'socioPrincipal',
    }); 

    if(!isLoading) return <SocioPrincipalSkeleton />
    
    return (
        <section className="flex flex-col before:bg-white border shadow p-4 rounded w-[360px] sm:w-[469px]">
            <Title>Socio Principal</Title>
            <p className="text-xs sm:text-sm bg-gray-100 p-2 rounded-md">{data}</p>
        </section>
    );
}

SocioPrincipal.propTypes = {
    data: PropTypes.string,
    isLoading: PropTypes.bool,
}