import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  it("starts at zero", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();

    expect(await counter.current()).to.equal(0n);
  });

  it("increments", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();

    await counter.increment();

    expect(await counter.current()).to.equal(1n);
  });

  it("sets a value", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();

    await counter.set(42);

    expect(await counter.current()).to.equal(42n);
  });
});