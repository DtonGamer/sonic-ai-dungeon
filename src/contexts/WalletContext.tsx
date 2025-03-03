import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  connect: async () => {},
  disconnect: async () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  
  // Configure the connection to the Solana network
  const network = clusterApiUrl('devnet');
  
  // Initialize wallet adapters
  const wallets = [new PhantomWalletAdapter()];

  // Mock wallet functions for development
  const connect = async () => {
    // In a real implementation, this would use the actual wallet adapter
    setConnected(true);
    setPublicKey('DummyPublicKeyForDevelopment');
  };

  const disconnect = async () => {
    setConnected(false);
    setPublicKey(null);
  };

  const value = {
    connected,
    publicKey,
    connect,
    disconnect,
  };

  return (
    <ConnectionProvider endpoint={network}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContext.Provider value={value}>
            {children}
          </WalletContext.Provider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};