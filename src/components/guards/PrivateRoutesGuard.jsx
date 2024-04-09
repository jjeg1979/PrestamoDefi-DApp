import { PublicRoutes } from '@/utils/routes'
import { Navigate, Outlet } from 'react-router-dom'
import { useAccount } from 'wagmi'

export default function PrivateRoutesGuard() {
  const { address } = useAccount()

  if (!address) {
    return <Navigate to={PublicRoutes.HOME} replace />
  }

  return <Outlet />
}