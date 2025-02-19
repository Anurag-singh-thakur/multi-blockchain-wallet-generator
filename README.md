# Multi-Blockchain Wallet Generator

## Overview

The Multi-Blockchain Wallet Generator is a React application that allows users to generate and manage wallets for multiple blockchain networks, specifically Solana and Ethereum. Users can create new wallets, view their addresses, and check their balances, all while securely managing their mnemonic phrases.

## Features

- **Wallet Generation**: Generate new wallets for Solana and Ethereum using a secure mnemonic phrase.
- **Address Management**: View and copy wallet addresses and private keys.
- **Balance Checking**: Fetch and display the current balance of each wallet.
- **User-Friendly Interface**: A clean and intuitive UI built with React and Tailwind CSS.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **bip39**: For mnemonic generation and seed derivation.
- **ethers.js**: For Ethereum wallet management.
- **@solana/web3.js**: For Solana wallet management.
- **Lucide React**: For icons.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/multi-blockchain-wallet-generator.git
   cd multi-blockchain-wallet-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. On the home screen, select your preferred blockchain wallet (Solana or Ethereum).
2. Generate a new wallet or enter an existing mnemonic phrase.
3. Manage your wallets by viewing addresses, copying them, and checking balances.
4. You can delete the Wallets as Well All at once or one by one as you wish
## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the developers of the libraries used in this project.