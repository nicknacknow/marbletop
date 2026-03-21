import { ethers } from "ethers";

const RPC_URL = "http://127.0.0.1:8545";

const provider = new ethers.JsonRpcProvider(RPC_URL);

const a = await provider.getBlockNumber();
console.log(a);

const COUNTER_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const COUNTER_CONTRACT_ABI = [
  "function current() view returns (uint256)",
  "function increment()",
  "function set(uint256 newValue)",

  // events
  "event ValueChanged(address indexed caller, uint256 newValue)"
]

const contract = new ethers.Contract(COUNTER_CONTRACT_ADDRESS, COUNTER_CONTRACT_ABI, provider);

const count = await contract.current();

const tx = await contract.increment();
const receipt = await tx.wait();

console.log(receipt); // nope