import Lilkeepies from "../build/contracts/Lilkeepies.json";
import Web3 from "web3";
var contract = require("@truffle/contract");

export const load = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  const { LilContract, childs } = await loadContract(addressAccount);

  return { addressAccount, LilContract, childs };
};

const loadChilds = async (LilContract, addressAccount) => {
  const tasksCount = await LilContract.numChilds(addressAccount);
  const childs = [];
  for (var i = 0; i < tasksCount; i++) {
    const child = await LilContract.Childs(addressAccount, i);
    childs.push(child);
  }
  return childs;
};

const loadContract = async (addressAccount) => {
  const theContract = contract(Lilkeepies);
  theContract.setProvider(web3.eth.currentProvider);
  const LilContract = await theContract.deployed();
  const childs = await loadChilds(LilContract, addressAccount);

  return { LilContract, childs };
};

const loadAccount = async () => {
  const addressAccount = await web3.eth.getCoinbase();
  return addressAccount;
};

const loadWeb3 = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({
      /* ... */
    });
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};
