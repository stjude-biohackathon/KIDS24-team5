# Reviewer 3

## Prerequisites

- **Node.js v18**: Download and install from [Node.js official website](https://nodejs.org/).

## Installation and Running the Vite Server

1. **Install dependencies**:
   ```sh
   npm install
   ```
2. **Run the Vite server**:
   ```sh
   npm run dev
   ```

## Setting Up Ollama Server and Llama 3.1 Model

1. **Install Ollama server**:
   Follow the instructions on the [Ollama GitHub page](https://github.com/ollama/ollama).

2. **Setup Llama 3.1 model**:
   Download and configure the Llama 3.1 model as per the instructions provided in the Ollama documentation.

Edit the src/lib/ollama-client.js file to set the IP & port of your ollama installation

```javascript
const PORT = 11434
const IP = 'localhost'
```

## Additional Notes for Windows Users

- It is recommended to use **WSL2** for a smoother experience. Follow the instructions on the [Microsoft WSL2 documentation](https://docs.microsoft.com/en-us/windows/wsl/install) to set it up.
