import { ethers } from "ethers";

// ─── Config ────────────────────────────────────────────────────────────────
const RPC_URL = "http://127.0.0.1:8545";   // swap for Alchemy/Infura in prod
const COUNTER_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const COUNTER_CONTRACT_ABI = [
  "function current() view returns (uint256)",
  "function increment()",
  "function set(uint256 newValue)",

  // events
  "event ValueChanged(address indexed caller, uint256 newValue)"
]

// ─── Providers ─────────────────────────────────────────────────────────────

// Always available — no wallet needed
let readProvider = new ethers.JsonRpcProvider(RPC_URL);
let readContract = new ethers.Contract(COUNTER_CONTRACT_ADDRESS, COUNTER_CONTRACT_ABI, readProvider);

// Only available after MetaMask connects
let writeContract = null;

console.log("HIII")
const val = await readContract.current()
console.log(val);