import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from './WalletContext';
import { generateQuest, completeQuest } from '../services/questService';

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

interface GameContextType {
  quests: Quest[];
  activeQuest: Quest | null;
  playerStats: {
    level: number;
    experience: number;
    questsCompleted: number;
    dragonsSlain: number;
  };
  loadQuests: () => Promise<void>;
  startQuest: (questId: string) => void;
  completeActiveQuest: () => Promise<boolean>;
  gameEvents: string[];
}

const GameContext = createContext<GameContextType>({
  quests: [],
  activeQuest: null,
  playerStats: {
    level: 1,
    experience: 0,
    questsCompleted: 0,
    dragonsSlain: 0,
  },
  loadQuests: async () => {},
  startQuest: () => {},
  completeActiveQuest: async () => false,
  gameEvents: [],
});

export const useGame = () => useContext(GameContext);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { connected, publicKey } = useWallet();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [gameEvents, setGameEvents] = useState<string[]>([]);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    questsCompleted: 0,
    dragonsSlain: 0,
  });

  // Load quests when wallet is connected
  useEffect(() => {
    if (connected) {
      loadQuests();
    }
  }, [connected]);

  // Check for game events based on player stats
  useEffect(() => {
    if (playerStats.questsCompleted === 5) {
      addGameEvent("You've completed 5 quests! A special sword has appeared!");
    }
    
    if (playerStats.dragonsSlain === 3) {
      addGameEvent("You've slain 3 dragons! Your reputation is growing in the realm!");
    }
  }, [playerStats]);

  const addGameEvent = (event: string) => {
    setGameEvents(prev => [event, ...prev].slice(0, 10));
  };

  const loadQuests = async () => {
    try {
      // In a real implementation, this would fetch quests from the backend
      const newQuests = await Promise.all(
        Array(3).fill(0).map(async (_, i) => {
          const quest = await generateQuest();
          return {
            ...quest,
            id: `quest-${Date.now()}-${i}`,
            completed: false,
          };
        })
      );
      
      setQuests(newQuests);
      addGameEvent("New quests have arrived!");
    } catch (error) {
      console.error("Failed to load quests:", error);
      addGameEvent("Failed to load new quests. Try again later.");
    }
  };

  const startQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      setActiveQuest(quest);
      addGameEvent(`You've started the quest: ${quest.title}`);
    }
  };

  const completeActiveQuest = async () => {
    if (!activeQuest) return false;
    
    try {
      // In a real implementation, this would verify quest completion on the backend
      const success = await completeQuest(activeQuest.id);
      
      if (success) {
        // Update quests
        setQuests(quests.map(q => 
          q.id === activeQuest.id ? { ...q, completed: true } : q
        ));
        
        // Update player stats
        setPlayerStats(prev => ({
          ...prev,
          experience: prev.experience + (activeQuest.difficulty === 'easy' ? 10 : activeQuest.difficulty === 'medium' ? 20 : 30),
          questsCompleted: prev.questsCompleted + 1,
          dragonsSlain: activeQuest.description.toLowerCase().includes('dragon') ? prev.dragonsSlain + 1 : prev.dragonsSlain,
        }));
        
        addGameEvent(`Quest completed: ${activeQuest.title}! You earned a new NFT!`);
        setActiveQuest(null);
        
        // If all quests are completed, load new ones
        if (quests.every(q => q.completed)) {
          await loadQuests();
        }
        
        return true;
      } else {
        addGameEvent("Failed to complete the quest. Try again.");
        return false;
      }
    } catch (error) {
      console.error("Error completing quest:", error);
      addGameEvent("An error occurred while completing the quest.");
      return false;
    }
  };

  const value = {
    quests,
    activeQuest,
    playerStats,
    loadQuests,
    startQuest,
    completeActiveQuest,
    gameEvents,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};