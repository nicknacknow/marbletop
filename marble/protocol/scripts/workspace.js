import { ethers } from "ethers";

const RPC_URL = "http://127.0.0.1:8545";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const a = await provider.getBlockNumber();
console.log(a);

// for context NEVER hardcode this lol 
const private_key = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const wallet = new ethers.Wallet(private_key, provider);
console.log(wallet)

const code = await provider.getCode("0x5FbDB2315678afecb367f032d93F642f64180aa3");
console.log("Contract code:", code);