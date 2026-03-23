import { ethers } from "hardhat";

const VAULT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const [me, user2] = await ethers.getSigners();
  console.log("Using account:", me.address);

  const vault = await ethers.getContractAt("Vault", VAULT_ADDRESS);

  const myVault = vault.connect(me);
  const user2Vault = vault.connect(user2);

  console.log(ethers.formatEther(await myVault.balance()), "ETH");

  const tx = await myVault.deposit({ value: ethers.parseEther("1.0") });
  const receipt = await tx.wait();

  console.log(ethers.formatEther(await myVault.balance()), "ETH");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});


/*

  const counter = await ethers.getContractAt("Counter", MARBLE_POT_ADDRESS);

  const before = await counter.current();
  console.log("Before:", before.toString());

  const tx = await counter.increment();
  await tx.wait();

  const after = await counter.current();
  console.log("After increment:", after.toString());

*/