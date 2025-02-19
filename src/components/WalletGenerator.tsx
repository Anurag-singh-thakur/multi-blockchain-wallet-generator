import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';

const WalletGenerator: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [showWallets, setShowWallets] = useState<boolean>(false);

  const handleGenerateMnemonic = () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
    setShowWallets(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Kosh supports multiple blockchains</h1>
      <div className="mb-4">
        <button onClick={handleGenerateMnemonic} className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition">
          Generate Secret Phrase
        </button>
      </div>
      {mnemonic && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {mnemonic.split(' ').map((word, index) => (
            <div key={index} className="bg-gray-800 p-2 rounded">{word}</div>
          ))}
        </div>
      )}
      {showWallets && (
        <>
          <EthWallet mnemonic={mnemonic} />
          <SolanaWallet mnemonic={mnemonic} />
        </>
      )}
    </div>
  );
};

export default WalletGenerator;