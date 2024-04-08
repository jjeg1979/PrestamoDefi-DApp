import { useAccount } from 'wagmi'
import { ConnectKitButton } from 'connectkit'

export default function Home() {

    const { isConnected } = useAccount()

   
    return (
      <div className="flex flex-col self-center sm:grid place-items-center px-3 py-16 md:px-5 gap-12">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl mb-2 bg-gradient-to-r from-indigo-600 to-green-400 text-transparent bg-clip-text">
        Blockmaker PrestamosDeFi DApp
      </h1>

      {isConnected ? (
        <div className="flex gap-12">
          <p className="text-gray-500 md:text-xl text-center py-10 font-bold">
            Una aplicación para que gente con ideas pero sin dinero pueda asociarse con gente que esté dispuesta a invertir en esas ideas.
            <br />
            Blockmaker PrestamosDeFi DApp ofrece transacciones rápidas, bajas tarifas y una plataforma segura.            
          </p>
        </div>
      ) : (
        <>
          <div className="flex gap-12">
            <p className="text-gray-500 md:text-xl text-center py-10 font-bold">
              Una aplicación para que gente con ideas pero sin dinero pueda asociarse con gente que esté dispuesta a invertir en esas ideas.
              <br />
              Blockmaker PrestamosDeFi DApp ofrece transacciones rápidas, bajas tarifas y una plataforma segura.            
            </p>
          </div>
          <p className="text-xl sm:text-2xl">🔒 Conecta tu wallet para comenzar.</p>
          <ConnectKitButton mode='dark'/>
        </>
      )}
      </div>
    )
  }