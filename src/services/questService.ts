import axios from 'axios';

// Mock OpenAI API for development
const mockOpenAI = {
  generateQuest: async () => {
    const questTypes = [
      {
        title: "Dragon's Lair Expedition",
        description: "Venture into the ancient dragon's lair and retrieve a scale from the sleeping beast without waking it.",
        reward: "Dragon Slayer Sword",
        difficulty: "hard"
      },
      {
        title: "Goblin Encampment Raid",
        description: "Clear out the goblin encampment that has been terrorizing local farmers.",
        reward: "Goblin Cleaver",
        difficulty: "medium"
      },
      {
        title: "Lost Artifact Recovery",
        description: "Recover the lost artifact from the abandoned temple in the forest.",
        reward: "Ancient Relic Blade",
        difficulty: "medium"
      },
      {
        title: "Magical Essence Collection",
        description: "Collect magical essence from the glowing crystals in the enchanted cave.",
        reward: "Arcane Sword",
        difficulty: "easy"
      },
      {
        title: "Bandit Leader Takedown",
        description: "Defeat the bandit leader who has been organizing raids on merchant caravans.",
        reward: "Bandit's Bane",
        difficulty: "medium"
      }
    ];
    
    return questTypes[Math.floor(Math.random() * questTypes.length)];
  }
};

// In a real implementation, this would use the OpenAI API
export const generateQuest = async () => {
  try {
    // For production, uncomment this code and use actual OpenAI API
    /*
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a fantasy game quest generator. Create a quest with a title, description, reward (a type of sword), and difficulty (easy, medium, or hard)."
          },
          {
            role: "user",
            content: "Generate a new quest for my fantasy game."
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const questData = JSON.parse(response.data.choices[0].message.content);
    return questData;
    */
    
    // For development, use mock data
    return await mockOpenAI.generateQuest();
  } catch (error) {
    console.error("Error generating quest:", error);
    throw error;
  }
};

export const completeQuest = async (questId: string) => {
  try {
    // In a real implementation, this would verify quest completion on the backend
    // For development, always return success
    return true;
  } catch (error) {
    console.error("Error completing quest:", error);
    throw error;
  }
};