import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
export let signer = null;

export async function connectWallet() {
  const browserProvider = new ethers.BrowserProvider(window.ethereum);
  signer = await browserProvider.getSigner();

  window.ethereum.on("accountsChanged", async ([account]) => {
    signer = account ? await browserProvider.getSigner() : null;
  });
  window.ethereum.on("chainChanged", () => window.location.reload());

  return signer.getAddress();
}