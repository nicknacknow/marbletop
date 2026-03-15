import { ethers } from "hardhat";

async function main() {
  const MarblePot = await ethers.getContractFactory("MarblePot");
  const pot = await MarblePot.deploy();
  await pot.waitForDeployment();

  const address = await pot.getAddress();
  console.log("MarblePot deployed to:", address);

  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  console.log("Counter deployed at:", await counter.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});