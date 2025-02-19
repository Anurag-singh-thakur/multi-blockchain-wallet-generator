import React from 'react';
import { WalletIcon, FeatherIcon } from "lucide-react";

interface HomeScreenProps {
  onSelect: (walletType: 'solana' | 'ethereum') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Choose Your Wallet
        </h1>
        <p className="text-muted-foreground max-w-[500px] mx-auto">
          Select your preferred blockchain wallet to continue. Your gateway to decentralized finance starts here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto p-4 animate-fade-in-up">
        <button
          onClick={() => onSelect('solana')}
          className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all duration-300 bg-card"
        >
          <div className="p-8 text-left w-full h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                <WalletIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold">Solana Wallet</h2>
            </div>
            <p className="text-muted-foreground">
              Fast, efficient, and cost-effective transactions on the Solana blockchain.
            </p>
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>

        <button
          onClick={() => onSelect('ethereum')}
          className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all duration-300 bg-card"
        >
          <div className="p-8 text-left w-full h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                <FeatherIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold">Ethereum Wallet</h2>
            </div>
            <p className="text-muted-foreground">
              Secure and established ecosystem on the Ethereum network.
            </p>
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;