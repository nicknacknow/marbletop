import { ethers } from "ethers";

const ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ABI = [
  "function current() view returns (uint256)",
  "function increment()",
  "function set(uint256 newValue)",
  "event ValueChanged(address indexed caller, uint256 newValue)"
];

// each contract will be in charge of specifying its address & abi
// but from there, what else? i want it to be able to know when to use which contract auto
// i could possibly hook up the abi to the artifact generated? i dont rlly wanna do that tho...

const iface = new ethers.Interface(ABI);

console.log(iface)

// Pure & View functions are read-only. So use read contract
// Else, use write contract
