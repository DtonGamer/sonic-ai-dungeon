import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, Shield, Sparkles, AlertTriangle } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useGame } from '../contexts/GameContext';
import { useNFT } from '../contexts/NFTContext';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { connected } = useWallet();
  const { quests, activeQuest, startQuest, completeActiveQuest, gameEvents, playerStats } = useGame();
  const { mintNewNFT } = useNFT();
  const [questResult, setQuestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);

  const handleStartQuest = (questId: string) => {
    startQuest(questId);
    setQuestResult(null);
  };

  const handleCompleteQuest = async () => {
    if (!activeQuest) return;
    
    setIsLoading(true);
    try {
      const success = await completeActiveQuest();
      
      if (success) {
        // Mint a new NFT as a reward
        const nftMinted = await mintNewNFT(activeQuest.id);
        
        setQuestResult({
          success: true,
          message: nftMinted 
            ? `Quest completed! You've earned a new sword NFT: ${activeQuest.reward}` 
            : `Quest completed! But there was an issue minting your NFT.`
        });
      } else {
        setQuestResult({
          success: false,
          message: "Failed to complete the quest. Try again."
        });
      }
    } catch (error) {
      console.error("Error completing quest:", error);
      setQuestResult({
        success: false,
        message: "An error occurred while completing the quest."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quest List */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Available Quests</h2>
        
        {quests.length === 0 ? (
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center">
            <p className="text-gray-400">No quests available. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quests.map(quest => (
              <div 
                key={quest.id}
                className={`bg-gray-800 bg-opacity-50 rounded-lg p-6 border ${
                  quest.completed 
                    ? 'border-green-600 opacity-75' 
                    : activeQuest?.id === quest.id 
                      ? 'border-purple-500' 
                      : 'border-gray-700 hover:border-purple-600'
                } transition`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold mb-2 text-white">{quest.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    quest.difficulty === 'easy' 
                      ? 'bg-green-900 text-green-300' 
                      : quest.difficulty === 'medium'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-red-900 text-red-300'
                  }`}>
                    {quest.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{quest.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Sword className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-sm text-purple-300">Reward: {quest.reward}</span>
                  </div>
                  
                  {quest.completed ? (
                    <span className="text-green-400 text-sm">Completed</span>
                  ) : activeQuest?.id === quest.id ? (
                    <button
                      onClick={handleCompleteQuest}
                      disabled={isLoading}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Completing..." : "Complete Quest"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartQuest(quest.id)}
                      disabled={!!activeQuest}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Start Quest
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Quest Result */}
        {questResult && (
          <div className={`mt-6 p-4 rounded-lg ${
            questResult.success ? 'bg-green-900 bg-opacity-30' : 'bg-red-900 bg-opacity-30'
          }`}>
            <div className="flex items-start">
              {questResult.success ? (
                <Sparkles className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              )}
              <p className={questResult.success ? 'text-green-300' : 'text-red-300'}>
                {questResult.message}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Sidebar */}
      <div className="space-y-6">
        {/* Player Stats */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Player Stats</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Level</span>
              <span className="text-white font-medium">{playerStats.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Experience</span>
              <span className="text-white font-medium">{playerStats.experience}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quests Completed</span>
              <span className="text-white font-medium">{playerStats.questsCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Dragons Slain</span>
              <span className="text-white font-medium">{playerStats.dragonsSlain}</span>
            </div>
          </div>
        </div>
        
        {/* Game Events */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Game Events</h3>
          
          {gameEvents.length === 0 ? (
            <p className="text-gray-400 text-sm">No recent events.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {gameEvents.map((event, index) => (
                <div key={index} className="text-sm border-l-2 border-purple-600 pl-3 py-1">
                  <p className="text-gray-300">{event}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;