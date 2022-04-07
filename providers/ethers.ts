import { ethers } from "ethers";
const bscTestnetRpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
export const ethersProvider = new ethers.providers.JsonRpcProvider(
  bscTestnetRpc
);
