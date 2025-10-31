# Data Wars: Encrypted Numbers Game

<div align="center">

**A Privacy-Preserving Blockchain Game Built with Fully Homomorphic Encryption**

[![License](https://img.shields.io/badge/License-BSD_3--Clause_Clear-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.27-brightgreen.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Framework-Hardhat-yellow.svg)](https://hardhat.org/)
[![FHEVM](https://img.shields.io/badge/FHEVM-Zama-purple.svg)](https://docs.zama.ai/fhevm)

</div>

---

## 📖 Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Why Data Wars?](#why-data-wars)
- [Technology Stack](#technology-stack)
- [Problems We Solve](#problems-we-solve)
- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Smart Contract Details](#smart-contract-details)
- [Frontend Application](#frontend-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Development Scripts](#development-scripts)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [Resources](#resources)
- [License](#license)
- [Support](#support)

---

## 🎮 Introduction

**Data Wars** is a groundbreaking blockchain-based mini-game that demonstrates the power of **Fully Homomorphic Encryption (FHE)** in creating privacy-preserving decentralized applications. Unlike traditional blockchain games where all game state is publicly visible, Data Wars keeps player data encrypted throughout the entire gameplay lifecycle, enabling truly confidential on-chain gaming.

In Data Wars, players join the game to receive three encrypted random numbers between 1 and 100. These numbers remain encrypted both on-chain and in transit, ensuring complete privacy. Players can then strategically choose one of their encrypted numbers to claim points, with all computations happening on encrypted data without ever revealing the underlying values.

This project serves as both an entertaining game and a powerful demonstration of how FHE can revolutionize blockchain applications by bringing privacy to smart contracts.

---

## ✨ Key Features

### Privacy-First Architecture
- **End-to-End Encryption**: All game data remains encrypted on the blockchain using FHEVM
- **Confidential Random Number Generation**: Players receive encrypted random values that are never revealed publicly
- **Private Score Tracking**: Player scores are computed and stored in encrypted form
- **Selective Decryption**: Only authorized players can decrypt their own game data using FHE access control

### Decentralized & Trustless
- **No Centralized Authority**: All game logic runs on-chain via smart contracts
- **Verifiable Randomness**: Random number generation uses blockchain-native entropy sources
- **Transparent Logic**: Smart contract code is open-source and auditable
- **Permissionless**: Anyone can join and play without registration or KYC

### User-Friendly Experience
- **Modern Web3 Interface**: Sleek React-based UI with RainbowKit wallet integration
- **Seamless Wallet Connection**: Support for multiple wallet providers
- **Real-Time Decryption**: Client-side decryption of encrypted game data using FHE SDK
- **Responsive Design**: Works on desktop and mobile devices

### Developer-Friendly
- **Comprehensive Testing Suite**: Full test coverage for both local and testnet environments
- **TypeScript Support**: Type-safe contract interactions and frontend development
- **Hardhat Integration**: Modern development workflow with hot reloading and debugging
- **Extensible Architecture**: Easy to build upon and customize

---

## 🎯 Why Data Wars?

### The Privacy Problem in Blockchain Gaming

Traditional blockchain games suffer from a fundamental limitation: **complete transparency**. Every move, every item, every strategy is visible to all participants. This transparency, while great for financial transactions, creates several problems in gaming:

1. **No Strategic Depth**: Competitors can see your cards, resources, and next moves
2. **MEV Exploitation**: Bots can front-run advantageous actions
3. **Player Privacy Concerns**: All gameplay data is permanently public
4. **Limited Game Mechanics**: Cannot implement hidden information games

### Our Solution: FHE-Powered Privacy

Data Wars leverages **Fully Homomorphic Encryption (FHE)** to solve these problems by:

- **Encrypting Game State**: All sensitive data remains encrypted on-chain
- **Computing on Encrypted Data**: Smart contracts operate on ciphertext without decryption
- **Preserving Blockchain Benefits**: Maintains decentralization, verifiability, and immutability
- **Enabling New Game Types**: Opens possibilities for poker, strategy games, and more

### Competitive Advantages

| Feature | Traditional Blockchain Games | Data Wars (FHE-Powered) |
|---------|------------------------------|------------------------|
| Data Privacy | All data public | Encrypted on-chain |
| Strategic Gameplay | Limited by transparency | Full hidden information support |
| MEV Protection | Vulnerable | Protected by encryption |
| Computational Privacy | None | FHE enables private computations |
| User Experience | Complex privacy solutions | Seamless encrypted experience |
| Scalability | Standard L1/L2 | Optimized FHE operations |

---

## 🛠 Technology Stack

### Blockchain & Smart Contracts
- **[FHEVM](https://docs.zama.ai/fhevm)** - Fully Homomorphic Encryption Virtual Machine by Zama
- **[Solidity](https://soliditylang.org/)** 0.8.27 - Smart contract programming language
- **[Hardhat](https://hardhat.org/)** 2.26.0 - Ethereum development environment
- **[ethers.js](https://docs.ethers.org/)** 6.15.0 - Ethereum library for contract interaction
- **[@fhevm/solidity](https://www.npmjs.com/package/@fhevm/solidity)** 0.8.0 - FHE Solidity library
- **[@fhevm/hardhat-plugin](https://www.npmjs.com/package/@fhevm/hardhat-plugin)** 0.1.0 - Hardhat FHE integration

### Cryptography & Privacy
- **[@zama-fhe/oracle-solidity](https://www.npmjs.com/package/@zama-fhe/oracle-solidity)** 0.1.0 - FHE oracle for decryption
- **[@zama-fhe/relayer-sdk](https://www.npmjs.com/package/@zama-fhe/relayer-sdk)** 0.2.0/0.3.0 - Client-side FHE operations
- **encrypted-types** 0.0.4 - TypeScript types for encrypted values

### Frontend
- **[React](https://react.dev/)** 19.1.1 - UI library
- **[TypeScript](https://www.typescriptlang.org/)** 5.8.3 - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** 7.1.6 - Fast build tool and dev server
- **[RainbowKit](https://www.rainbowkit.com/)** 2.2.8 - Wallet connection UI
- **[Wagmi](https://wagmi.sh/)** 2.17.0 - React hooks for Ethereum
- **[TanStack Query](https://tanstack.com/query)** 5.89.0 - Data fetching and caching
- **[Viem](https://viem.sh/)** 2.37.6 - TypeScript Ethereum interface

### Development Tools
- **[TypeChain](https://github.com/dethcrypto/TypeChain)** 8.3.2 - TypeScript bindings for contracts
- **[Hardhat Deploy](https://github.com/wighawag/hardhat-deploy)** 0.11.45 - Deployment management
- **[Mocha](https://mochajs.org/)** & **[Chai](https://www.chaijs.com/)** - Testing framework
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - Code quality tools
- **[Solhint](https://github.com/protofire/solhint)** - Solidity linter
- **[Hardhat Gas Reporter](https://github.com/cgewecke/hardhat-gas-reporter)** - Gas usage analytics

### Network Support
- **Local Development**: Hardhat Network with FHEVM support
- **Testnet**: Ethereum Sepolia
- **Infrastructure**: Infura for RPC endpoints
- **Block Explorer**: Etherscan integration for contract verification

---

## 🔧 Problems We Solve

### 1. Privacy in Public Blockchains

**Problem**: Traditional blockchains are fully transparent, making every transaction and state change visible to everyone. This creates privacy concerns and limits use cases.

**Our Solution**: Data Wars uses FHEVM to keep sensitive game data encrypted on-chain. Players' numbers and scores remain confidential while still benefiting from blockchain's decentralization and immutability.

### 2. Fair Random Number Generation

**Problem**: Generating truly random, tamper-proof numbers on blockchain is challenging. Validators and miners can potentially manipulate outcomes.

**Our Solution**: We combine multiple entropy sources (block data, timestamps, player addresses) with cryptographic hashing to generate random numbers that are then immediately encrypted, preventing any manipulation.

### 3. MEV and Front-Running Attacks

**Problem**: In traditional blockchain games, bots can observe pending transactions and front-run advantageous moves, extracting value from regular players.

**Our Solution**: Since all game data is encrypted, malicious actors cannot determine the value of moves before they're executed, eliminating MEV exploitation opportunities.

### 4. Limited Game Mechanics on Blockchain

**Problem**: The transparency of traditional blockchains prevents implementing games that require hidden information (poker, strategy games, etc.).

**Our Solution**: FHE enables a whole new class of blockchain games where hidden information is preserved, opening up endless possibilities for complex game mechanics.

### 5. Developer Experience with FHE

**Problem**: Working with encrypted data and FHE primitives can be complex and intimidating for developers.

**Our Solution**: Data Wars provides a complete, well-documented reference implementation with:
- Clear smart contract patterns
- TypeScript integration
- Comprehensive testing examples
- Modern frontend integration
- Production-ready deployment scripts

### 6. User Experience with Encrypted Data

**Problem**: Interacting with encrypted blockchain data can be confusing for end users.

**Our Solution**: Our frontend seamlessly handles encryption/decryption operations behind the scenes using the FHE Relayer SDK, providing a smooth user experience comparable to traditional web applications.

---

## 🎮 How It Works

### Game Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Player Journey                           │
└─────────────────────────────────────────────────────────────────┘

1. Connect Wallet
   ↓
   Player connects via RainbowKit (MetaMask, WalletConnect, etc.)

2. Join Game (joinGame())
   ↓
   Smart contract generates 3 encrypted random numbers (1-100)
   ↓
   Numbers stored on-chain in encrypted form (euint32)
   ↓
   Player receives access permissions to decrypt their numbers

3. View Numbers
   ↓
   Frontend fetches encrypted numbers from contract
   ↓
   FHE Relayer SDK decrypts numbers client-side
   ↓
   Player sees their three random numbers

4. Claim Points (claimPoints(index))
   ↓
   Player selects one of their three numbers
   ↓
   Smart contract adds selected encrypted number to encrypted score
   ↓
   All computations happen on encrypted data (FHE operations)

5. View Score
   ↓
   Frontend fetches encrypted score
   ↓
   FHE Relayer SDK decrypts score client-side
   ↓
   Player sees their final score
```

### Encryption & Decryption Flow

```
┌────────────────────────────────────────────────────────────────┐
│                    FHE Operations                               │
└────────────────────────────────────────────────────────────────┘

Smart Contract (On-Chain)          Frontend (Client-Side)
─────────────────────────          ──────────────────────

1. Generate random value
   uint32 randomValue = ...

2. Encrypt value
   euint32 encrypted =
   FHE.asEuint32(randomValue)

3. Set permissions                  4. Request decryption
   FHE.allow(encrypted, player) ──────→ relayer.decrypt(encrypted)
                                        ↓
                                   5. Gateway processes
                                        ↓
                                   6. Return plaintext
                                        ↓
                                   7. Display to player
```

### Smart Contract State Machine

```
Player States:
┌─────────────┐  joinGame()   ┌─────────────┐  claimPoints()  ┌─────────────┐
│   Unjoined  │ ────────────→ │   Joined    │ ──────────────→ │   Claimed   │
│             │               │ (has 3 nums) │                 │ (has score) │
└─────────────┘               └─────────────┘                 └─────────────┘

Data Stored (All Encrypted):
- numbers: euint32[3]  // Three random encrypted numbers
- score: euint32        // Accumulated encrypted score
- joined: bool          // Registration status
- hasClaimed: bool      // Claim status
```

---

## 🏗 Architecture

### System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Data Wars System                             │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                               │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  React + TypeScript + Vite                                     │ │
│  │  ├─ RainbowKit (Wallet Connection)                             │ │
│  │  ├─ Wagmi Hooks (Contract Interactions)                        │ │
│  │  ├─ TanStack Query (State Management)                          │ │
│  │  └─ FHE Relayer SDK (Encryption/Decryption)                    │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                    ↕
┌─────────────────────────────────────────────────────────────────────┐
│                       Blockchain Layer                               │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Ethereum (Sepolia Testnet / Local Network)                    │ │
│  │  ├─ EncryptedNumbersGame.sol (Game Logic)                      │ │
│  │  ├─ FHEVM Runtime (FHE Operations)                             │ │
│  │  └─ FHE Gateway (Decryption Oracle)                            │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                    ↕
┌─────────────────────────────────────────────────────────────────────┐
│                    Development & Testing Layer                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Hardhat Development Environment                               │ │
│  │  ├─ FHEVM Plugin (FHE Testing)                                 │ │
│  │  ├─ TypeChain (Type Generation)                                │ │
│  │  ├─ Mocha/Chai (Testing Framework)                             │ │
│  │  └─ Hardhat Deploy (Deployment Management)                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Contract Architecture

```
┌──────────────────────────────────────────────────────────────┐
│            EncryptedNumbersGame Contract                      │
└──────────────────────────────────────────────────────────────┘

Inheritance:
  SepoliaConfig (FHEVM Configuration)

State Variables:
  mapping(address => PlayerData) private players
  uint256 private joinNonce

Structs:
  PlayerData {
    euint32[3] numbers    // Encrypted random numbers
    euint32 score         // Encrypted score
    bool joined           // Registration flag
    bool hasClaimed       // Claim status flag
  }

Functions:
  ┌─────────────────────────────────────────────────────────┐
  │ External Functions                                       │
  ├─────────────────────────────────────────────────────────┤
  │ joinGame()                                              │
  │ - Generates 3 encrypted random numbers (1-100)          │
  │ - Initializes player data                               │
  │ - Sets up FHE permissions                               │
  ├─────────────────────────────────────────────────────────┤
  │ claimPoints(uint8 numberIndex)                          │
  │ - Validates player and index                            │
  │ - Adds selected encrypted number to score (FHE.add)     │
  │ - Updates permissions                                   │
  ├─────────────────────────────────────────────────────────┤
  │ getEncryptedNumbers(address) → euint32[3]               │
  │ - Returns encrypted numbers for a player                │
  ├─────────────────────────────────────────────────────────┤
  │ getEncryptedScore(address) → euint32                    │
  │ - Returns encrypted score for a player                  │
  ├─────────────────────────────────────────────────────────┤
  │ getPlayerStatus(address) → (bool, bool)                 │
  │ - Returns joined and claimed status                     │
  └─────────────────────────────────────────────────────────┘

Events:
  - GameJoined(address indexed player)
  - PointsClaimed(address indexed player, uint8 indexed numberIndex)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 20 or higher ([Download](https://nodejs.org/))
- **npm**: Version 7.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))
- **MetaMask** or another Web3 wallet ([Install](https://metamask.io/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Data-Wars.git
   cd Data-Wars
   ```

2. **Install contract dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ui
   npm install
   cd ..
   ```

4. **Set up environment variables**

   For contract deployment and testing:

   ```bash
   # Set your mnemonic (12-word seed phrase)
   npx hardhat vars set MNEMONIC

   # Set your Infura API key for Sepolia access
   npx hardhat vars set INFURA_API_KEY

   # Optional: Set Etherscan API key for contract verification
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

   Alternatively, create a `.env` file:

   ```bash
   PRIVATE_KEY=your_private_key_here
   INFURA_API_KEY=your_infura_api_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

5. **Compile contracts**

   ```bash
   npm run compile
   ```

### Quick Start: Local Development

1. **Start a local FHEVM node**

   In terminal 1:
   ```bash
   npx hardhat node
   ```

2. **Deploy contracts to local network**

   In terminal 2:
   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Run tests**

   ```bash
   npm run test
   ```

4. **Start frontend development server**

   ```bash
   cd ui
   npm run dev
   ```

   The UI will be available at `http://localhost:5173`

### Quick Start: Sepolia Testnet

1. **Get Sepolia ETH**

   - Visit [Sepolia Faucet](https://sepoliafaucet.com/) to get test ETH

2. **Deploy to Sepolia**

   ```bash
   npx hardhat deploy --network sepolia
   ```

3. **Verify contract on Etherscan**

   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

4. **Run Sepolia tests**

   ```bash
   npm run test:sepolia
   ```

5. **Configure frontend for Sepolia**

   Update `ui/src/config/contracts.ts` with your deployed contract address.

6. **Run frontend**

   ```bash
   cd ui
   npm run dev
   ```

---

## 📁 Project Structure

```
Data-Wars/
├── contracts/                      # Smart contract source files
│   └── EncryptedNumbersGame.sol   # Main game contract with FHE logic
│
├── deploy/                         # Deployment scripts
│   └── deploy.ts                   # Hardhat deploy script for all networks
│
├── tasks/                          # Custom Hardhat tasks
│   ├── accounts.ts                 # List available accounts
│   └── encryptedNumbersGame.ts     # Game-specific tasks and utilities
│
├── test/                           # Test suites
│   ├── EncryptedNumbersGame.ts           # Local network tests (mock FHE)
│   └── EncryptedNumbersGameSepolia.ts    # Sepolia testnet integration tests
│
├── ui/                             # Frontend application
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── GameApp.tsx         # Main game interface
│   │   │   └── Header.tsx          # Wallet connection header
│   │   ├── config/                 # Configuration files
│   │   │   ├── contracts.ts        # Contract addresses and ABIs
│   │   │   └── wagmi.ts            # Wagmi/RainbowKit config
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useEncryptedGame.ts # Game contract interactions
│   │   │   └── useFHEDecrypt.ts    # FHE decryption logic
│   │   ├── styles/                 # CSS/styling files
│   │   ├── App.tsx                 # Root component
│   │   └── main.tsx                # Application entry point
│   ├── public/                     # Static assets
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.ts              # Vite configuration
│   └── tsconfig.json               # TypeScript config
│
├── types/                          # Generated TypeScript types
│   └── typechain/                  # TypeChain contract types
│
├── artifacts/                      # Compiled contract artifacts
├── cache/                          # Hardhat cache
│
├── hardhat.config.ts               # Hardhat configuration
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment variable template
├── LICENSE                         # BSD-3-Clause-Clear License
└── README.md                       # This file
```

---

## 📜 Smart Contract Details

### EncryptedNumbersGame.sol

The core game contract implementing FHE-based private gaming mechanics.

**Location**: `contracts/EncryptedNumbersGame.sol`

#### Key Functions

##### joinGame()
```solidity
function joinGame() external
```
- **Purpose**: Register a new player and generate encrypted random numbers
- **Access**: Public, callable by any address (once per address)
- **Process**:
  1. Validates player hasn't already joined
  2. Generates deterministic seed from block data and nonce
  3. Creates 3 random numbers between 1-100
  4. Encrypts each number using FHE.asEuint32()
  5. Sets FHE permissions for contract and player
  6. Initializes encrypted score to 0
- **Emits**: `GameJoined(address indexed player)`
- **Gas Cost**: ~300k-400k gas (varies with FHE operations)

##### claimPoints(uint8 numberIndex)
```solidity
function claimPoints(uint8 numberIndex) external
```
- **Purpose**: Claim points using one of the encrypted numbers
- **Parameters**:
  - `numberIndex`: Index of the number to use (0, 1, or 2)
- **Access**: Only by registered players who haven't claimed yet
- **Process**:
  1. Validates player registration and claim status
  2. Validates numberIndex is in range [0, 2]
  3. Retrieves selected encrypted number
  4. Performs FHE addition: `score = score + selectedNumber`
  5. Updates FHE permissions
  6. Marks player as claimed
- **Emits**: `PointsClaimed(address indexed player, uint8 indexed numberIndex)`
- **Gas Cost**: ~150k-200k gas

##### getEncryptedNumbers(address playerAddress)
```solidity
function getEncryptedNumbers(address playerAddress)
    external view returns (euint32[3] memory)
```
- **Purpose**: Retrieve encrypted numbers for a player
- **Returns**: Array of 3 encrypted numbers (FHE handles)
- **Access**: View function (read-only)
- **Note**: Frontend uses FHE Relayer SDK to decrypt client-side

##### getEncryptedScore(address playerAddress)
```solidity
function getEncryptedScore(address playerAddress)
    external view returns (euint32)
```
- **Purpose**: Retrieve encrypted score for a player
- **Returns**: Encrypted score (FHE handle)
- **Access**: View function (read-only)

##### getPlayerStatus(address playerAddress)
```solidity
function getPlayerStatus(address playerAddress)
    external view returns (bool joined, bool hasClaimed)
```
- **Purpose**: Check player's game status
- **Returns**: Registration and claim status flags
- **Access**: View function (read-only)

#### FHE Operations Used

| Operation | Function | Purpose |
|-----------|----------|---------|
| `FHE.asEuint32()` | Encryption | Convert plaintext uint32 to encrypted euint32 |
| `FHE.add()` | Arithmetic | Add two encrypted numbers homomorphically |
| `FHE.allow()` | Permission | Grant decryption permission to address |
| `FHE.allowThis()` | Permission | Grant decryption permission to contract |

#### Security Considerations

1. **Nonce for Randomness**: Uses incrementing nonce to ensure unique random values
2. **Access Control**: FHE permissions ensure only authorized addresses can decrypt
3. **One-Time Actions**: Players can only join once and claim once
4. **Input Validation**: All external inputs are validated before use
5. **Reentrancy Safe**: No external calls after state changes

---

## 🎨 Frontend Application

### Architecture

The frontend is a modern React application built with TypeScript and Vite, providing a seamless Web3 gaming experience.

**Location**: `ui/`

### Key Components

#### GameApp.tsx
Main game interface component handling all player interactions.

**Features**:
- Wallet connection status display
- Join game functionality
- Display encrypted numbers (with client-side decryption)
- Point claiming interface
- Score display
- Real-time state updates

**Hooks Used**:
- `useAccount()` - Wallet connection state
- `useContractWrite()` - Contract transactions
- `useContractRead()` - Contract state queries
- `useFHEDecrypt()` - FHE decryption operations

#### Header.tsx
Wallet connection header with RainbowKit integration.

**Features**:
- Connect/disconnect wallet
- Account display
- Network switching
- Mobile responsive

### Configuration Files

#### wagmi.ts
Wagmi and RainbowKit configuration for Web3 connectivity.

**Includes**:
- Supported chains (Sepolia, Localhost)
- RPC endpoints (Infura)
- Wallet connectors (MetaMask, WalletConnect, etc.)
- Client configuration

#### contracts.ts
Contract addresses and ABI definitions.

**Structure**:
```typescript
export const contracts = {
  sepolia: {
    EncryptedNumbersGame: {
      address: "0x...",
      abi: EncryptedNumbersGameABI
    }
  },
  localhost: {
    EncryptedNumbersGame: {
      address: "0x...",
      abi: EncryptedNumbersGameABI
    }
  }
}
```

### Custom Hooks

#### useEncryptedGame.ts
React hook for game contract interactions.

**Exports**:
- `useJoinGame()` - Join game transaction
- `useClaimPoints()` - Claim points transaction
- `usePlayerNumbers()` - Fetch encrypted numbers
- `usePlayerScore()` - Fetch encrypted score
- `usePlayerStatus()` - Fetch game status

#### useFHEDecrypt.ts
React hook for FHE decryption operations using Relayer SDK.

**Exports**:
- `useDecryptNumber()` - Decrypt single euint32
- `useDecryptNumbers()` - Decrypt array of euint32
- `useDecryptScore()` - Decrypt score value

**Process**:
1. Initialize FHE Relayer client
2. Request decryption from gateway
3. Verify decryption proof
4. Return plaintext value
5. Handle errors gracefully

### Styling

- **Framework**: CSS Modules with Vite
- **Responsive**: Mobile-first design
- **Theme**: Dark mode with purple/blue accents
- **Animations**: Smooth transitions and loading states

### Development

```bash
cd ui

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🧪 Testing

### Test Structure

We provide comprehensive test coverage for both local development (with mocked FHE) and testnet deployment (with real FHE operations).

### Local Tests (Mock FHE)

**File**: `test/EncryptedNumbersGame.ts`

**Coverage**:
- ✅ Player registration and join validation
- ✅ Encrypted number generation
- ✅ Point claiming mechanics
- ✅ Score accumulation (FHE addition)
- ✅ Access control and permissions
- ✅ Edge cases (double join, invalid index, etc.)
- ✅ Event emissions
- ✅ Decryption testing (local mock)

**Run tests**:
```bash
npm run test
```

**Example test**:
```typescript
it("should allow player to join and receive encrypted numbers", async () => {
  await contract.connect(alice).joinGame();

  const numbers = await contract.getEncryptedNumbers(alice.address);
  expect(numbers.length).to.equal(3);

  // Decrypt and verify range
  const decrypted = await decryptNumbers(
    numbers,
    contractAddress,
    alice
  );

  expect(decrypted[0]).to.be.within(1, 100);
  expect(decrypted[1]).to.be.within(1, 100);
  expect(decrypted[2]).to.be.within(1, 100);
});
```

### Sepolia Tests (Real FHE)

**File**: `test/EncryptedNumbersGameSepolia.ts`

**Purpose**: Integration testing on real testnet with actual FHE gateway

**Coverage**:
- ✅ End-to-end game flow on testnet
- ✅ Real FHE encryption/decryption
- ✅ Gateway interaction
- ✅ Gas cost analysis
- ✅ Network-specific behavior

**Run Sepolia tests**:
```bash
npm run test:sepolia
```

**Note**: Requires:
- Sepolia ETH in your wallet
- Deployed contract on Sepolia
- Valid INFURA_API_KEY

### Test Utilities

**Decryption Helper**:
```typescript
async function decryptNumbers(
  encrypted: readonly string[],
  contractAddress: string,
  signer: HardhatEthersSigner
): Promise<number[]> {
  const clearNumbers: number[] = [];

  for (const handle of encrypted) {
    const clear = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      handle,
      contractAddress,
      signer
    );
    clearNumbers.push(Number(clear));
  }

  return clearNumbers;
}
```

### Coverage Report

Generate test coverage report:

```bash
npm run coverage
```

**Target Coverage**:
- Statements: > 90%
- Branches: > 85%
- Functions: > 95%
- Lines: > 90%

---

## 🚢 Deployment

### Local Network Deployment

1. **Start local node**:
   ```bash
   npx hardhat node
   ```

2. **Deploy contracts** (in another terminal):
   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Note the contract address** from output:
   ```
   EncryptedNumbersGame contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```

4. **Update frontend config**:
   Edit `ui/src/config/contracts.ts`:
   ```typescript
   localhost: {
     EncryptedNumbersGame: {
       address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
       abi: EncryptedNumbersGameABI
     }
   }
   ```

### Sepolia Testnet Deployment

1. **Ensure you have Sepolia ETH**:
   - Get from [Sepolia Faucet](https://sepoliafaucet.com/)
   - Minimum 0.1 ETH recommended

2. **Set environment variables**:
   ```bash
   npx hardhat vars set PRIVATE_KEY
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

3. **Deploy to Sepolia**:
   ```bash
   npx hardhat deploy --network sepolia
   ```

4. **Verify contract on Etherscan**:
   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

5. **Update frontend config** with new address

### Production Deployment (Mainnet)

**⚠️ Warning**: This is experimental technology. Thorough auditing and testing required before mainnet deployment.

**Recommended Steps**:
1. Complete security audit
2. Test extensively on testnet
3. Deploy to mainnet with caution
4. Monitor gas costs and performance
5. Have emergency pause mechanism
6. Implement upgrade pattern if needed

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Contract compiled successfully
- [ ] Tests passing (100%)
- [ ] Gas costs analyzed and acceptable
- [ ] Contract deployed to target network
- [ ] Contract verified on block explorer
- [ ] Frontend config updated with address
- [ ] Frontend tested against deployed contract
- [ ] Documentation updated
- [ ] Deployment announced (if public)

---

## 📜 Development Scripts

### Contract Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile all smart contracts |
| `npm run test` | Run test suite on local network |
| `npm run test:sepolia` | Run tests on Sepolia testnet |
| `npm run coverage` | Generate test coverage report |
| `npm run lint` | Run Solidity and TypeScript linting |
| `npm run lint:sol` | Lint Solidity files only |
| `npm run lint:ts` | Lint TypeScript files only |
| `npm run clean` | Clean artifacts and cache |
| `npm run typechain` | Generate TypeScript types from contracts |
| `npm run prettier:check` | Check code formatting |
| `npm run prettier:write` | Format code automatically |
| `npm run deploy:localhost` | Deploy to local network |
| `npm run deploy:sepolia` | Deploy to Sepolia testnet |
| `npm run verify:sepolia` | Verify contract on Etherscan |

### Frontend Scripts

```bash
cd ui

# Development
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

### Custom Hardhat Tasks

#### List Accounts
```bash
npx hardhat accounts --network sepolia
```

#### Game-Specific Tasks
```bash
# Join game as current account
npx hardhat encryptedGame:join --network sepolia

# Claim points (index 0-2)
npx hardhat encryptedGame:claim --index 0 --network sepolia

# Get player status
npx hardhat encryptedGame:status --player 0x... --network sepolia
```

### Useful Commands

```bash
# Clean and rebuild everything
npm run clean && npm run compile

# Full test cycle
npm run compile && npm run test && npm run coverage

# Deploy and verify
npm run deploy:sepolia && npm run verify:sepolia <ADDRESS>

# Format all files
npm run prettier:write

# Check for security issues
npm audit

# Update dependencies
npm update
```

---

## 🗺 Future Roadmap

We have an exciting vision for Data Wars and its evolution as a showcase for FHE technology in blockchain gaming. Here's what's planned:

### Phase 1: Core Enhancements (Q2 2025)
- [ ] **Multiple Game Rounds**: Allow players to play multiple rounds and track cumulative scores
- [ ] **Leaderboard System**: Privacy-preserving leaderboard using FHE comparisons
- [ ] **Enhanced Randomness**: Integrate Chainlink VRF for verifiable random numbers
- [ ] **Gas Optimization**: Optimize FHE operations for lower transaction costs
- [ ] **Mobile App**: Native mobile application for iOS and Android
- [ ] **Achievement System**: Encrypted achievement tracking and NFT rewards

### Phase 2: Gameplay Expansion (Q3 2025)
- [ ] **Multiplayer Modes**: Head-to-head and tournament modes
- [ ] **Strategic Elements**: Power-ups, special abilities, and combo mechanics
- [ ] **Time-Limited Challenges**: Daily and weekly challenges with rewards
- [ ] **Player Profiles**: Encrypted player statistics and history
- [ ] **Social Features**: Friend invitations and private lobbies
- [ ] **Betting Mechanics**: Stake tokens on game outcomes

### Phase 3: Advanced FHE Features (Q4 2025)
- [ ] **Encrypted Marketplace**: Trade in-game items while keeping prices private
- [ ] **Private Auctions**: FHE-based sealed-bid auctions
- [ ] **Complex Computations**: Encrypted game state with branching logic
- [ ] **Cross-Chain Support**: Bridge to other FHE-compatible chains
- [ ] **ZK Integration**: Combine FHE with zero-knowledge proofs
- [ ] **Confidential Governance**: Private voting for game parameters

### Phase 4: Ecosystem Growth (Q1 2026)
- [ ] **SDK Release**: Developer toolkit for building FHE games
- [ ] **Game Engine**: Modular framework for creating encrypted games
- [ ] **Plugin System**: Community-created game modes and extensions
- [ ] **Developer Grants**: Funding for innovative FHE game concepts
- [ ] **Educational Content**: Tutorials, workshops, and documentation
- [ ] **Hackathons**: FHE gaming competitions and challenges

### Phase 5: Advanced Gaming Concepts (Q2 2026+)
- [ ] **Poker Implementation**: Full Texas Hold'em with encrypted cards
- [ ] **Strategy Games**: Turn-based games with fog of war
- [ ] **Card Battlers**: Collectible card games with hidden hands
- [ ] **Escape Rooms**: Puzzle games with encrypted clues
- [ ] **RPG Elements**: Character stats and inventory management
- [ ] **Metaverse Integration**: VR/AR support for encrypted worlds

### Research & Development
- [ ] **Performance Benchmarking**: Comprehensive FHE operation analysis
- [ ] **New FHE Primitives**: Exploring advanced cryptographic operations
- [ ] **Scalability Solutions**: Layer 2 FHE solutions and rollups
- [ ] **Hardware Acceleration**: Specialized hardware for FHE computations
- [ ] **Academic Partnerships**: Collaborate with universities on FHE research
- [ ] **Standardization Efforts**: Contribute to FHE standards and protocols

### Infrastructure Improvements
- [ ] **Decentralized Gateway**: Eliminate centralized decryption oracle
- [ ] **Caching Layer**: Reduce redundant FHE operations
- [ ] **Monitoring Dashboard**: Real-time analytics for contract performance
- [ ] **Auto-Scaling**: Dynamic resource allocation based on usage
- [ ] **Backup & Recovery**: Robust disaster recovery mechanisms
- [ ] **Multi-Region Support**: Global deployment for low latency

### Community & Ecosystem
- [ ] **DAO Governance**: Community-driven game development
- [ ] **Token Economics**: Native token for in-game economy
- [ ] **NFT Integration**: Unique encrypted game assets
- [ ] **Content Creator Tools**: Tools for streamers and content creators
- [ ] **Ambassador Program**: Community evangelists for FHE gaming
- [ ] **Bug Bounty**: Security research program with rewards

### Long-Term Vision
Our ultimate goal is to make Data Wars a reference implementation and flagship demonstration of what's possible when combining blockchain technology with fully homomorphic encryption. We envision:

- **A thriving ecosystem** of FHE-powered games built on our infrastructure
- **Mass adoption** of privacy-preserving blockchain gaming
- **Developer education** through comprehensive documentation and examples
- **Industry standards** for FHE gaming protocols
- **Research advancement** in practical FHE applications

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're a developer, designer, tester, or just enthusiastic about FHE technology, there's a place for you in Data Wars.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- **Code Style**: Follow existing code formatting (use Prettier and ESLint)
- **Testing**: Add tests for new features
- **Documentation**: Update README and code comments
- **Commit Messages**: Use clear, descriptive commit messages
- **Gas Optimization**: Be mindful of gas costs in contract changes
- **Security**: Report security issues privately to security@data-wars.io

### Areas for Contribution

- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **New Features**: Implement roadmap items or suggest new ones
- 📝 **Documentation**: Improve guides and tutorials
- 🎨 **UI/UX**: Enhance frontend design and experience
- 🧪 **Testing**: Improve test coverage
- ⚡ **Performance**: Optimize gas usage and speed
- 🌍 **Localization**: Translate to other languages
- 🎓 **Education**: Create tutorials and examples

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch
4. Make your changes
5. Run tests: `npm run test`
6. Submit a pull request

### Code of Conduct

Be respectful, inclusive, and professional. We're building a welcoming community around FHE technology.

---

## 📚 Resources

### Official Documentation
- [FHEVM Documentation](https://docs.zama.ai/fhevm) - Complete guide to FHEVM
- [Zama GitHub](https://github.com/zama-ai/fhevm) - FHEVM source code
- [Hardhat Documentation](https://hardhat.org/docs) - Ethereum development environment
- [Solidity Documentation](https://docs.soliditylang.org/) - Smart contract language

### FHEVM Resources
- [FHEVM Whitepaper](https://docs.zama.ai) - Technical specifications
- [FHE Primitives](https://docs.zama.ai/fhevm/fundamentals/types) - Encrypted types and operations
- [FHEVM Examples](https://github.com/zama-ai/fhevm-contracts) - Sample contracts
- [Gas Cost Analysis](https://docs.zama.ai/fhevm/fundamentals/gas) - FHE operation costs

### Frontend Development
- [React Documentation](https://react.dev/) - React framework
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Viem](https://viem.sh/) - TypeScript Ethereum interface
- [TanStack Query](https://tanstack.com/query) - Data fetching

### Learning Resources
- [Zama Blog](https://www.zama.ai/blog) - Latest FHE news
- [FHE Explained](https://www.zama.ai/fhe) - Introduction to FHE
- [Blockchain Gaming Trends](https://www.coindesk.com/learn/blockchain-gaming/) - Industry overview
- [Web3 Development](https://ethereum.org/en/developers/) - Ethereum developer resources

### Community
- [Zama Discord](https://discord.gg/zama) - FHE community
- [Zama Twitter](https://twitter.com/zama_fhe) - Updates and announcements
- [Data Wars Discord](https://discord.gg/data-wars) - Project-specific discussions
- [GitHub Discussions](https://github.com/your-username/Data-Wars/discussions) - Q&A and ideas

### Tools & Services
- [Sepolia Faucet](https://sepoliafaucet.com/) - Get testnet ETH
- [Etherscan Sepolia](https://sepolia.etherscan.io/) - Block explorer
- [Infura](https://infura.io/) - Ethereum RPC endpoints
- [MetaMask](https://metamask.io/) - Web3 wallet

### Related Projects
- [Battleship Game (FHE)](https://github.com/zama-ai/battleship) - Another FHE game example
- [Encrypted ERC20](https://github.com/zama-ai/fhevm-contracts) - Private token standard
- [Blind Auction](https://github.com/zama-ai/fhevm-contracts) - FHE auction implementation

---

## 📄 License

This project is licensed under the **BSD-3-Clause-Clear License**.

See the [LICENSE](LICENSE) file for full details.

### Key Points:
- ✅ Use for commercial and non-commercial purposes
- ✅ Modify and distribute
- ✅ Private use
- ❌ No patent grant
- ❌ Trademark use not granted
- ⚠️ Provided "as is" without warranty

---

## 🆘 Support

Need help? We're here for you!

### GitHub Issues
Report bugs or request features:
[https://github.com/your-username/Data-Wars/issues](https://github.com/your-username/Data-Wars/issues)

### Discussions
Ask questions and share ideas:
[https://github.com/your-username/Data-Wars/discussions](https://github.com/your-username/Data-Wars/discussions)

### Discord
Join our community:
[https://discord.gg/data-wars](https://discord.gg/data-wars)

### Documentation
Browse the docs:
[https://docs.data-wars.io](https://docs.data-wars.io)

### Email
For private inquiries:
support@data-wars.io

### FHEVM Support
For FHEVM-specific questions:
- [Zama Discord](https://discord.gg/zama)
- [FHEVM Docs](https://docs.zama.ai/fhevm)
- [GitHub Issues](https://github.com/zama-ai/fhevm/issues)

---

## 🙏 Acknowledgments

This project was made possible by:

- **[Zama](https://www.zama.ai/)** - For creating FHEVM and advancing FHE technology
- **[Hardhat](https://hardhat.org/)** - For the excellent development framework
- **[RainbowKit](https://www.rainbowkit.com/)** - For beautiful wallet connections
- **[Ethereum Foundation](https://ethereum.org/)** - For the blockchain infrastructure
- **The FHE Community** - For pushing the boundaries of privacy technology
- **Our Contributors** - For helping build and improve Data Wars

### Special Thanks
- FHEVM team for technical support and guidance
- Early testers and community members
- Open source contributors worldwide

---

## 🎯 Project Status

**Current Version**: 0.1.0 (Alpha)
**Status**: Active Development
**Testnet**: Live on Sepolia
**Mainnet**: Not yet deployed

### Recent Updates
- ✅ Initial smart contract implementation
- ✅ Frontend UI with RainbowKit integration
- ✅ Comprehensive test suite
- ✅ Sepolia testnet deployment
- ✅ Documentation and README
- 🔄 Gas optimization in progress
- 🔄 Mobile responsive design improvements

### Coming Soon
- 🔜 Multiple game rounds
- 🔜 Leaderboard system
- 🔜 Enhanced UI/UX
- 🔜 Mobile app

---

<div align="center">

## 🌟 Star Us on GitHub!

If you find Data Wars interesting or useful, please consider giving us a star ⭐

**Built with privacy, powered by FHE, secured by blockchain**

[GitHub](https://github.com/your-username/Data-Wars) • [Discord](https://discord.gg/data-wars) • [Twitter](https://twitter.com/DataWarsGame) • [Website](https://data-wars.io)

---

**© 2025 Data Wars. All rights reserved.**

*Powered by Zama FHEVM Technology*

</div>
