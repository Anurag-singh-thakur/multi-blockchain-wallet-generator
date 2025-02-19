import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';


export const getSolBalance = async (address: string): Promise<string> => {
  const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/HeI5KOtYDHvE7MQ3U3pEkfpHkOGXUNWb');
  const publicKey = new PublicKey(address);
  const balance = await connection.getBalance(publicKey);
  return (balance / 1e9).toString();
}; 

export const getEthBalance = async (address: string): Promise<string> => {
  const url = 'https://eth-mainnet.g.alchemy.com/v2/PJBJ6OgH0ZJ1EZUz9H62UNsK72-hXg87';
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"]
  });

  const balance = response.data.result;
  return (parseFloat(balance) / Math.pow(10, 18)).toString(); 
};