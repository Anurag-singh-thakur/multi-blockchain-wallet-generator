import type React from "react"
import { useState } from "react"
import { generateMnemonic } from "bip39"
import { ChevronDown, ChevronUp, KeyRound, Copy, Check, RefreshCw, Plus, Eye, EyeOff, Trash2 } from "lucide-react"

interface WalletInputProps {
  walletType: "solana" | "ethereum"
}

interface WalletData {
  address: string
  privateKey: string
  balance: string
  mnemonic: string
}

const WalletInput: React.FC<WalletInputProps> = ({ walletType }) => {
  const [wallets, setWallets] = useState<WalletData[]>([])
  const [mnemonic, setMnemonic] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPrivateKey, setShowPrivateKey] = useState<{ [key: number]: boolean }>({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)

  const handleGenerateWallet = async () => {
    setIsLoading(true)
    try {
      const newMnemonic = mnemonic || generateMnemonic()
      setMnemonic(newMnemonic)

      const newWallet: WalletData = {
        address:
          walletType === "solana"
            ? `HN7cABqLq46Es1jh92dQQisAq662SmxELL${Math.random().toString(36).slice(2, 8)}`
            : `0x742d35Cc6634C0532925a3b844Bc454e4438f${Math.random().toString(36).slice(2, 8)}`,
        privateKey: `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
        balance: "0.00",
        mnemonic: newMnemonic,
      }

      setWallets((prev) => [...prev, newWallet])
    } catch (error) {
      console.error("Error generating wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteWallet = (index: number) => {
    setWallets((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClearAllWallets = () => {
    setWallets([])
    setShowDeleteConfirm(false)
  }

  const togglePrivateKey = (index: number) => {
    setShowPrivateKey((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const mnemonicWords = mnemonic.split(" ")
  const mnemonicRows = [mnemonicWords.slice(0, 4), mnemonicWords.slice(4, 8), mnemonicWords.slice(8, 12)]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {walletType === "solana" ? "Solana Wallet" : "Ethereum Wallet"}
          </h1>
          <p className="text-muted-foreground">Generate multiple wallets or enter your secret recovery phrase</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              placeholder="Enter secret phrase or generate new"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerateWallet}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add New Wallet
            </button>
            {wallets.length > 0 && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {mnemonic && (
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-foreground hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Your Secret Phrase</span>
                </div>
                {isDropdownOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="p-4 border-t border-border">
                  <div className="space-y-3 mb-4">
                    {mnemonicRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-4 gap-2">
                        {row.map((word, index) => (
                          <div key={index} className="px-3 py-2 bg-muted rounded text-center text-sm">
                            <span className="text-foreground">{word}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleCopy(mnemonic, "mnemonic")}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedId === "mnemonic" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy to clipboard
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {wallets.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Your Wallets</h2>
              {wallets.map((wallet, index) => (
                <div key={index} className="border border-border rounded-lg bg-card overflow-hidden">
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Wallet #{index + 1}</span>
                      <span className="text-sm font-medium text-foreground">
                        {wallet.balance} {walletType === "solana" ? "SOL" : "ETH"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Address</span>
                          <button
                            onClick={() => handleCopy(wallet.address, `address-${index}`)}
                            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                          >
                            {copiedId === `address-${index}` ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-muted p-2 rounded text-sm font-mono break-all">{wallet.address}</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Private Key</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePrivateKey(index)}
                              className="text-sm text-muted-foreground hover:text-foreground"
                            >
                              {showPrivateKey[index] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleCopy(wallet.privateKey, `private-${index}`)}
                              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                            >
                              {copiedId === `private-${index}` ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="bg-muted p-2 rounded text-sm font-mono break-all">
                          {showPrivateKey[index] ? wallet.privateKey : "••••••••••••••••••••••••••••••••"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteWallet(index)}
                      className="w-full mt-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete Wallet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete all wallets? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAllWallets}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletInput

