import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, ArrowUpRight, Info } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useNFT } from '../contexts/NFTContext';
import { useGame } from '../contexts/GameContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { connected } = useWallet();
  const { nfts, loading } = useNFT();
  const { playerStats } = useGame();

  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);

  if (!connected) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold text-purple-300 mb-4 md:mb-0">NFT Collection</h1>
        
        <div className="flex items-center space-x-2 bg-gray-800 bg-opacity-50 rounded-lg px-4 py-2">
          <Sword className="h-5 w-5 text-purple-400" />
          <span className="text-white font-medium">{nfts.length} Swords Collected</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : nfts.length === 0 ? (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 text-center">
          <Sword className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">No NFTs Yet</h3>
          <p className="text-gray-400 mb-6">Complete quests to earn your first sword NFT!</p>
          <button
            onClick={() => navigate('/game')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition"
          >
            Go to Quests
          </button>
        </div>
      ) : (
        <>
          {/* NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map(nft => (
              <div 
                key={nft.id}
                className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-600 transition"
              >
                <div className="relative aspect-square">
                  <img 
                    src={nft.imageUrl} 
                    alt={nft.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1">
                    <div className="flex items-center space-x-1 px-2 py-1">
                      <span className="text-xs font-medium text-purple-300">Level {nft.attributes.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{nft.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{nft.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-900 bg-opacity-50 rounded p-2">
                      <span className="text-xs text-gray-500">Type</span>
                      <p className="text-sm text-white">{nft.attributes.type}</p>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 rounded p-2">
                      <span className="text-xs text-gray-500">Rarity</span>
                      <p className="text-sm text-white">{nft.attributes.rarity}</p>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 rounded p-2">
                      <span className="text-xs text-gray-500">Power</span>
                      <p className="text-sm text-white">{nft.attributes.power}</p>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 rounded p-2">
                      <span className="text-xs text-gray-500">Evolution</span>
                      <p className="text-sm text-white">Stage {nft.evolutionStage}</p>
                    </div>
                  </div>
                  
                  {nft.attributes.dragonScales && (
                    <div className="mb-4 flex items-center space-x-2 bg-orange-900 bg-opacity-30 text-orange-300 px-3 py-1.5 rounded-md text-sm">
                      <Info className="h-4 w-4" />
                      <span>Dragon Scales</span>
                    </div>
                  )}
                  
                  {nft.attributes.elementalPower && (
                    <div className="mb-4 flex items-center space-x-2 bg-blue-900 bg-opacity-30 text-blue-300 px-3 py-1.5 rounded-md text-sm">
                      <Info className="h-4 w-4" />
                      <span>Elemental: {nft.attributes.elementalPower}</span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => navigate('/game')}
                    className="w-full flex items-center justify-center space-x-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-sm transition"
                  >
                    <span>Use in Quest</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Evolution Triggers */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-purple-300">Evolution Triggers</h2>
            
            <div className="space-y-4">
              <EvolutionTrigger 
                title="Dragon Scale Infusion"
                description="Slay 5 dragons to infuse your sword with dragon scales."
                progress={playerStats.dragonsSlain}
                target={5}
                completed={playerStats.dragonsSlain >= 5}
              />
              
              <EvolutionTrigger 
                title="Elemental Awakening"
                description="Complete 10 quests to awaken elemental powers in your sword."
                progress={playerStats.questsCompleted}
                target={10}
                completed={playerStats.questsCompleted >= 10}
              />
              
              <EvolutionTrigger 
                title="Legendary Status"
                description="Reach player level 5 to unlock legendary sword transformations."
                progress={playerStats.level}
                target={5}
                completed={playerStats.level >= 5}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const EvolutionTrigger: React.FC<{
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}> = ({ title, description, progress, target, completed }) => {
  const percentage = Math.min(Math.round((progress / target) * 100), 100);
  
  return (
    <div className={`p-4 rounded-lg ${completed ? 'bg-green-900 bg-opacity-20' : 'bg-gray-900 bg-opacity-50'}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium ${completed ? 'text-green-300' : 'text-white'}`}>{title}</h3>
        <span className={`text-sm ${completed ? 'text-green-300' : 'text-gray-400'}`}>
          {progress}/{target}
        </span>
      </div>
      
      <p className="text-sm text-gray-400 mb-3">{description}</p>
      
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${completed ? 'bg-green-500' : 'bg-purple-600'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;