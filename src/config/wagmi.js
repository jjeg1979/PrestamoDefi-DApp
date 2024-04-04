// Archivo wagmi.js
import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    // Importamos la variable de entorno con import.meta.env
    alchemyId: import.meta.env.VITE_ALCHEMY_ID,
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    appName: "Prestamos DeFi",
    // Configuramos la chain
    chains: [sepolia],
  })
);

export default config;
