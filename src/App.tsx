import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { GameProvider } from './contexts/GameContext';
import { NFTProvider } from './contexts/NFTContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <WalletProvider>
      <GameProvider>
        <NFTProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex flex-col">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </NFTProvider>
      </GameProvider>
    </WalletProvider>
  );
}

export default App;