import { ethers } from "ethers";

export async function getSigner() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
  } else {
    console.error(
      "Please install MetaMask or other Ethereum compatible wallet."
    );
    return null;
  }
}
