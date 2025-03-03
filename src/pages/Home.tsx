import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Shield, Sparkles, Zap } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const Home: React.FC = () => {
  const { connected, connect } = useWallet();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
          Sonic Sword Saga
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Embark on AI-generated quests, collect evolving NFT swords, and become a legendary hero on Solana.
        </p>
        
        {connected ? (
          <Link 
            to="/game" 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            Play Now
          </Link>
        ) : (
          <button 
            onClick={() => connect()}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            Connect Wallet to Play
          </button>
        )}
      </section>
      
      {/* Features Section */}
      <section className="w-full py-16 bg-gray-900 bg-opacity-50 rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">Game Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Sword className="h-10 w-10 text-purple-400" />}
              title="AI-Generated Quests"
              description="Every quest is uniquely created by OpenAI, ensuring no two adventures are the same."
            />
            
            <FeatureCard 
              icon={<Sparkles className="h-10 w-10 text-pink-400" />}
              title="Evolving NFTs"
              description="Your sword NFTs evolve based on your actions, changing appearance and gaining new powers."
            />
            
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-blue-400" />}
              title="Dynamic Game Events"
              description="Your NFT collection triggers special events and boss encounters in the game world."
            />
            
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-yellow-400" />}
              title="Sonic SVM Powered"
              description="Built on Solana's Sonic SVM for lightning-fast transactions and real-time NFT updates."
            />
          </div>
        </div>
      </section>
      
      {/* How to Play Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">How to Play</h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <Step 
              number={1}
              title="Connect Your Wallet"
              description="Link your Phantom wallet to start your adventure and store your NFTs."
            />
            
            <Step 
              number={2}
              title="Complete Quests"
              description="Embark on AI-generated quests to earn sword NFTs and gain experience."
            />
            
            <Step 
              number={3}
              title="Evolve Your Collection"
              description="Use your swords in quests to evolve them with new appearances and powers."
            />
            
            <Step 
              number={4}
              title="Trigger Special Events"
              description="Collect specific combinations of swords to unlock special boss encounters."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-purple-800 hover:border-purple-600 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Step: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ number, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default Home;