// Mock Sonic SVM and Stable Diffusion APIs for development

// Sample NFT images from Unsplash (for development only)
const sampleNFTImages = [
  'https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1602910344008-22f323cc1817?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop'
];

// Mock NFT data for development
const mockNFTs = [
  {
    id: 'nft-1',
    name: 'Novice Sword',
    description: 'A basic sword for beginners. It has seen better days but still cuts true.',
    imageUrl: sampleNFTImages[0],
    attributes: {
      type: 'sword',
      rarity: 'common',
      power: 10,
      level: 1
    },
    evolutionStage: 1,
    questsUsedIn: []
  }
];

export const fetchUserNFTs = async (walletAddress: string) => {
  // In a real implementation, this would fetch NFTs from Sonic SVM
  // For development, return mock data
  return mockNFTs;
};

export const mintNFT = async (walletAddress: string, questId: string) => {
  // In a real implementation, this would mint an NFT on Sonic SVM
  // For development, return a new mock NFT
  const newNFT = {
    id: `nft-${Date.now()}`,
    name: 'Quest Reward Sword',
    description: 'A sword earned through completing a dangerous quest. It glows with a faint blue light.',
    imageUrl: sampleNFTImages[Math.floor(Math.random() * sampleNFTImages.length)],
    attributes: {
      type: 'sword',
      rarity: 'uncommon',
      power: 15,
      level: 1
    },
    evolutionStage: 1,
    questsUsedIn: [questId]
  };
  
  return newNFT;
};

export const evolveNFT = async (walletAddress: string, nftId: string, questId: string) => {
  // In a real implementation, this would evolve an NFT on Sonic SVM
  // For development, return an evolved mock NFT
  const nftToEvolve = mockNFTs.find(nft => nft.id === nftId);
  
  if (!nftToEvolve) return null;
  
  const evolvedNFT = {
    ...nftToEvolve,
    name: `${nftToEvolve.name} +1`,
    description: `${nftToEvolve.description} This sword has been strengthened through battle.`,
    imageUrl: sampleNFTImages[Math.floor(Math.random() * sampleNFTImages.length)],
    attributes: {
      ...nftToEvolve.attributes,
      power: nftToEvolve.attributes.power + 5,
      level: nftToEvolve.attributes.level + 1
    },
    evolutionStage: nftToEvolve.evolutionStage + 1,
    questsUsedIn: [...nftToEvolve.questsUsedIn, questId]
  };
  
  return evolvedNFT;
};