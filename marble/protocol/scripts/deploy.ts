import { ethers } from "hardhat";

async function deploy(name: string) {
  const Factory = await ethers.getContractFactory(name);
  const contract = await Factory.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`${name} deployed to: ${address}`);
  return contract;
}

async function main() {
  const pot = await deploy("MarblePot");
  const counter = await deploy("Counter");
  const vault = await deploy("Vault");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});