# Jokester-8004 (ERC-8004 Demo Agent)

## Project Overview
This project is an **ERC-8004 compliant AI Agent** named **Jokester-8004**. It is a specialized comedian agent that generates jokes based on user-provided topics. It demonstrates on-chain registration, Agent-to-Agent (A2A) communication, and Model Context Protocol (MCP) tool integration.

The agent is registered on the **Ethereum Sepolia Testnet** (Agent ID: `1154`).

## Tech Stack
*   **Runtime:** Node.js (pnpm)
*   **Language:** TypeScript
*   **Blockchain SDK:** `agent0-sdk` (Ethereum/Sepolia interaction, IPFS management)
*   **AI Provider:** **OpenRouter** (using `openai/gpt-4o-mini` model)
*   **Server Framework:** Express (for A2A)
*   **Protocol:** Model Context Protocol (MCP) SDK

## Architecture & Key Files

### Core Logic
*   **`src/agent.ts`**: The "brain" of the agent. Configured to use OpenRouter's API. Defines the **comedian** system prompt and logic for generating/streaming joke responses.

### Registration
*   **`src/register.ts`**: Script to register the agent on-chain.
    *   **Agent ID:** `1154`
    *   **Skill:** `natural_language_generation/story_generation`
    *   **Domain:** `arts_and_entertainment`
    *   **Wallet:** `0xC0bba073f6F0de11154F56826a880252A5e3bB9f`

### Discovery & Communication
*   **`.well-known/agent-card.json`**: The discovery metadata for the A2A protocol.
*   **`src/a2a-server.ts`**: HTTP server (Express) implementing the A2A protocol.
    *   Endpoint: `/a2a` (JSON-RPC 2.0)
    *   Methods: `message/send`, `tasks/get`, `tasks/cancel`
*   **`src/mcp-server.ts`**: Stdio server implementing the Model Context Protocol.
    *   Exposes tools: `chat`, `echo`, `get_time`.

### Testing
*   **`src/test-a2a.ts`**: A local test script to verify the A2A server's response logic.

## Setup & Usage

### 1. Environment Configuration
The project requires a `.env` file:
```env
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
PINATA_JWT=<YOUR_PINATA_JWT>
OPENROUTER_API_KEY=<YOUR_OPENROUTER_API_KEY>
# Optional
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PORT=3000
```

### 2. Building and Running
*   **Install Dependencies:**
    ```bash
    pnpm install
    ```
*   **Register Agent (On-Chain):**
    ```bash
    pnpm register
    ```
*   **Start A2A Server (HTTP):**
    ```bash
    pnpm start:a2a
    ```
*   **Test A2A Logic:**
    ```bash
    npx tsx src/test-a2a.ts
    ```
*   **Start MCP Server (Stdio):**
    ```bash
    pnpm start:mcp
    ```

## Development Conventions
*   **TypeScript:** All source code is in `src/` and written in TypeScript.
*   **OpenRouter:** The agent is configured to use OpenRouter. To change models, update `src/agent.ts`.
*   **Blockchain Identity:** The agent NFT is owned by the wallet derived from `PRIVATE_KEY`.
