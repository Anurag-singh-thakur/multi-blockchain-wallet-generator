import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { getSolBalance } from "../utils";

interface SolanaWalletProps {
  mnemonic: string;
}

export const SolanaWallet: React.FC<SolanaWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Array<string>>([]);
  const [balances, setBalances] = useState<string[]>([]);

  const handleOnClick = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    
    setCurrentIndex(currentIndex + 1);
    const publicKey = keypair.publicKey.toBase58();
    setPublicKeys([...publicKeys, publicKey]);

    // Fetch balance
    const balance = await getSolBalance(publicKey);
    setBalances([...balances, balance]);
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-800 shadow">
      <h2 className="text-xl font-semibold mb-2">Solana Wallets</h2>
      <button onClick={handleOnClick} className="p-2 rounded hover:bg-gray-300 transition">
        Add Wallet
      </button>
      <ul className="mt-2">
        {publicKeys.map((key, index) => (
          <li key={index} className="mt-1 text-gray-300">
            Sol - {key} (Balance: {balances[index] || 'Loading...'} SOL)
          </li>
        ))}
      </ul>
    </div>
  );
};