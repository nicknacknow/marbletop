// ─── Marbletop Frontend — app.js ──────────────────────────────────────────────
//
//
// ──────────────────────────────────────────────────────────────────────────────

const COUNTER_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const COUNTER_CONTRACT_ABI = [
  "function current() view returns (uint256)",
  "function increment()",
  "function set(uint256 newValue)",

  // events
  "event ValueChanged(address indexed caller, uint256 newValue)"
]

// ─── State ───────────────────────────────────────────────────────────────────

let provider;
let signer; // is it alright to store signer here? or should i calc from provider
let contract;

// ─── DOM refs ────────────────────────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const dom = {
  connDot: $("connDot"),
  accountDisplay: $("accountDisplay"),
  accountAddress: $("accountAddress"),
  accountAddressText: $("accountAddressText"),
  accountBalance: $("accountBalance"),
  addrTooltip: $("addrTooltip"),
  addrTooltipText: $("addrTooltipText"),
  toastContainer: $("toastContainer"),

  // buttons
  alertCount: $("alertCount"),
  incrementCount: $("incrementCount"),
}

// ─── Initialization ──────────────────────────────────────────────────────────

import { ethers } from "ethers";

async function init() {
  try {
    if (!window.ethereum) throw new Error("MetaMask required"); // maybe loop until found?

    provider = new ethers.BrowserProvider(window.ethereum);
    // await provider.send("eth_requestAccounts", []); // ask user to connect

    signer = await provider.getSigner();

    // validate contract exists
    const code = await provider.getCode(COUNTER_CONTRACT_ADDRESS);
    if (code === "0x") {
      throw new Error("No contract deployed at COUNTER_CONTRACT_ADDRESS on current network");
    }

    contract = new ethers.Contract(COUNTER_CONTRACT_ADDRESS, COUNTER_CONTRACT_ABI, signer);

    dom.connDot.classList.add("connected");
    toast("Connected to Hardhat node", "success");

    // Setup event listeners
    setupEventListeners();
    setupContractEvents();

    // Initial data load
    await updateAccountInfo();
    await updateAccountBalance();

  } catch (err) {
    dom.connDot.classList.remove("connected");
    toast(String(err?.message || err), "error"); // specific logs here ok? or just 'Something went wrong, check console...'
    console.error(err);
  }
}

// ─── Event Listeners ─────────────────────────────────────────────────────────

function setupEventListeners() {
  dom.alertCount.addEventListener("click", handleAlertCount);
  dom.incrementCount.addEventListener("click", handleIncrementCount);
  dom.accountAddress.addEventListener("click", handleAddressClick);
}


// ─── Contract Events ─────────────────────────────────────────────────────────

function setupContractEvents() {
  contract.on("ValueChanged", (caller, newValue) => {
    console.log(`[ValueChanged] counter=${newValue} - ${caller}`)

    toast("New Count: " + newValue);
  });
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async function handleAlertCount() {
  const count = await contract.current();
  toast("Count: " + count);
}

async function handleIncrementCount() {
  const tx = await contract.increment();
  const receipt = await tx.wait();
  console.log("receipt:", receipt);
}

async function handleAddressClick() {
  const addr = dom.addrTooltipText.textContent;
  if (!addr) return;
  try {
    await navigator.clipboard.writeText(addr);
    toast("Address copied", "success");
  } catch {
    toast("Failed to copy", "error");
  }
}

/*

  contract.on("ValueChanged", (caller, newValue) => {
    console.log("New value:", newValue, caller)
  })

  console.log("count:", await contract.current());

  const tx = await contract.increment();
  const receipt = await tx.wait();
  console.log("receipt:", receipt);

  console.log("count:", await contract.current());

*/

// ─── Data refresh ────────────────────────────────────────────────────────────

async function updateAccountInfo() {
  try {
    const addr = await signer.getAddress();
    const shortAddr = addr.slice(0, 6) + "…" + addr.slice(-4);

    dom.accountAddressText.textContent = shortAddr;
    dom.accountDisplay.dataset.address = addr;
    dom.addrTooltipText.textContent = addr;
  } catch (err) {
    dom.accountAddressText.textContent = "--";
    delete dom.accountDisplay.dataset.address;
    dom.addrTooltipText.textContent = "";
  }
}

async function updateAccountBalance() {
  try {
    const addr = await signer.getAddress();
    const bal = await provider.getBalance(addr);
    dom.accountBalance.textContent = parseFloat(ethers.formatEther(bal)).toFixed(4) + " ETH";
  } catch (err) {
    dom.accountBalance.textContent = "-- ETH";
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toast(message, type = "info") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  dom.toastContainer.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}


init()