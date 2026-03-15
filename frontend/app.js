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
  accountBalance: $("accountBalance"),
  addrTooltip: $("addrTooltip"),
  addrTooltipText: $("addrTooltipText"),
  toastContainer: $("toastContainer"),

  // buttons
  clickme: $("clickme"),
}

// ─── Initialization ──────────────────────────────────────────────────────────

import { ethers } from "ethers";

async function init() {
  if (!window.ethereum) return alert("MetaMask required"); // add toast here, maybe loop until found?

  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // ask user to connect

    signer = await provider.getSigner();
    contract = new ethers.Contract(COUNTER_CONTRACT_ADDRESS, COUNTER_CONTRACT_ABI, signer);

    dom.connDot.classList.add("connected");
    toast("Connected to Hardhat node", "success");

    // Setup event listeners
    setupEventListeners();

    // Initial data load
    await updateAccountInfo();
    await updateAccountBalance();

  } catch (err) {
    dom.connDot.classList.remove("connected");
    toast("Failed to initialise node connection. Are you using MetaMask?", "error");
    console.error(err);
  }
}

// ─── Event Listeners ─────────────────────────────────────────────────────────

function setupEventListeners() {
  dom.clickme.addEventListener("click", handleClickme);
  dom.accountDisplay.addEventListener("click", handleAddressClick);
  dom.accountDisplay.addEventListener("mouseenter", positionAddrTooltip); // i dont like this styling in js
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async function handleClickme() {
  alert("yo")
}

async function handleAddressClick() {
  const addr = dom.accountDisplay.dataset.address;
  if (!addr) return;
  try {
    await navigator.clipboard.writeText(addr);
    toast("Address copied", "success");
  } catch {
    toast("Failed to copy", "error");
  }
}

function positionAddrTooltip() {
  const addrRect = dom.accountAddress.getBoundingClientRect();
  const parentRect = dom.accountDisplay.getBoundingClientRect();
  const tooltipWidth = dom.addrTooltip.offsetWidth;
  const addrCenter = (addrRect.left + addrRect.width / 2) - parentRect.left;
  dom.addrTooltip.style.left = (addrCenter - tooltipWidth / 2) + "px";
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

    dom.accountAddress.textContent = shortAddr;
    dom.accountDisplay.dataset.address = addr;
    dom.addrTooltipText.textContent = addr;
  } catch (err) {
    dom.accountAddress.textContent = "--";
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