import React from 'react';
import { Link } from 'react-router-dom';
import { Sword } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const Navbar: React.FC = () => {
  const { connected, connect, disconnect, publicKey } = useWallet();

  return (
    <nav className="bg-gray-900 border-b border-purple-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Sword className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Sonic Sword Saga
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/game" className="text-gray-300 hover:text-white transition">
              Play Game
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition">
              NFT Dashboard
            </Link>
            
            {connected ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">
                  {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition text-white text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect()}
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition text-white"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;