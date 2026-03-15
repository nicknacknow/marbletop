import { ethers } from "hardhat";

const MARBLE_POT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const [me] = await ethers.getSigners();
  console.log("Using account:", me.address);

  const pot = await ethers.getContractAt("MarblePot", MARBLE_POT_ADDRESS);

  const tx = await pot.createPot("name");
  await tx.wait();

  const count = await pot.potCount();
  console.log(count.toString());



  // Optional: set to a custom value
  // await (await counter.set(42)).wait();
  // console.log("After set:", (await counter.current()).toString());
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