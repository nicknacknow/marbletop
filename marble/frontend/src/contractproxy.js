import { ethers } from "ethers";

// ─── Config ────────────────────────────────────────────────────────────────
const RPC_URL = "http://127.0.0.1:8545";   // swap for Alchemy/Infura in prod
const CONTRACT_ADDRESS = "0xYourContractAddress";
const ABI = [
  "function getValue() view returns (uint256)",
  "function setValue(uint256 _value)",
  "function owner() view returns (address)",
];

// ─── Providers ─────────────────────────────────────────────────────────────

// Always available — no wallet needed
let readProvider = new ethers.JsonRpcProvider(RPC_URL);
let readContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, readProvider);

// Only available after MetaMask connects
let writeContract = null;

console.log("HIII")