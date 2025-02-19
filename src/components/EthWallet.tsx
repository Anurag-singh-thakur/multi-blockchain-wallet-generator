import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { getEthBalance } from "../utils";

interface EthWalletProps {
  mnemonic: string;
}

export const EthWallet: React.FC<EthWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [balances, setBalances] = useState<string[]>([]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);

    // Fetch balance
    const balance = await getEthBalance(wallet.address);
    setBalances([...balances, balance]);
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-800 shadow">
      <h2 className="text-xl font-semibold mb-2">Ethereum Wallets</h2>
      <button onClick={handleAddWallet} className="p-2 rounded hover:bg-gray-300 transition">
        Add ETH wallet
      </button>
      <ul className="mt-2">
        {addresses.map((address, index) => (
          <li key={index} className="mt-1 text-gray-300">
            Eth - {address} (Balance: {balances[index] || 'Loading...'} ETH)
          </li>
        ))}
      </ul>
    </div>
  );
};