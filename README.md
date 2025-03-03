# sonic-ai-dungeon

Documentation: Sonic AI Dungeon Master MVP
1. Project Overview
A Solana/SVM-based game combining AI-generated quests with evolving NFTs. Players earn sword NFTs through quests, which evolve based on their in-game actions using AI-generated content.

2. Technical Specifications
Component	Technology Stack
Frontend	React + TypeScript + Vite
State Management	React Context
Styling	Tailwind CSS
Wallet Integration	Phantom (Mocked)
AI Services	OpenAI (Mocked), Stable Diffusion (Mocked)
Blockchain	Sonic SVM (Mocked)

4. Project Structure
sonic-ai-dungeon/
├── public/
├── src/
│   ├── components/      # UI Components
│   ├── contexts/        # State Management
│   ├── pages/           # Application Views
│   ├── services/        # Game Logic & Mock APIs
│   ├── main.tsx         # Entry Point
│   └── App.tsx          # Root Component
├── package.json
├── tsconfig.json
└── vite.config.ts
5. Setup Instructions
Requirements:

Node.js ≥18.x

npm ≥9.x

Installation:
git clone https://github.com/Dtongamer/sonic-ai-dungeon.git
cd sonic-ai-dungeon
npm install
npm run dev
