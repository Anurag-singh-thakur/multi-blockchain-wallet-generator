// import { useState } from 'react';
// import './App.css';
// import { generateMnemonic } from "bip39";
// import { SolanaWallet } from './components/SolanaWallet';
// import { EthWallet } from './components/EthWallet';

// function App() {
//   const [mnemonic, setMnemonic] = useState("");

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setMnemonic(event.target.value);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Wallet Generator</h1>
//       <input 
//         type="text" 
//         value={mnemonic} 
//         onChange={handleInputChange} 
//         placeholder="Enter or generate mnemonic"
//         className="p-2 border border-gray-300 rounded mb-4 w-80"
//       />
//       <button 
//         onClick={async () => {
//           const mn = generateMnemonic();
//           setMnemonic(mn);
//         }}
//         className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//       >
//         Create Seed Phrase
//       </button>
//       <EthWallet mnemonic={mnemonic} />
//       <SolanaWallet mnemonic={mnemonic} />
//     </div>
//   );
// }

// export default App;
import  { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import WalletInput from './components/WalletInput';

function App() {
  const [walletType, setWalletType] = useState<'solana' | 'ethereum' | null>(null);

  const handleSelect = (type: 'solana' | 'ethereum') => {
    setWalletType(type);
  };

  return (
    <div>
      {walletType === null ? (
        <HomeScreen onSelect={handleSelect} />
      ) : (
        <WalletInput walletType={walletType} />
      )}
    </div>
  );
}

export default App;