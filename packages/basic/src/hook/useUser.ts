import { ethers } from "ethers";
import { useCallback, useState, useEffect } from "react";
import { MultiChainSDK } from "tokamak-multichain";
import { weiToDecimal } from "../utils/balanceNumber";
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

async function tryToConnectWallet() {
  if (
    typeof window.ethereum !== "undefined" ||
    typeof window.web3 !== "undefined"
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      // Request account access
      await window.ethereum.enable();
      return provider.getSigner();
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.log("MetaMask is not installed");
  }
}

export const useUser = () => {
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);
  const [tonBalance, setTonBalance] = useState<number | undefined>(undefined);

  const connectWallet = useCallback(async () => {
    const signer = await tryToConnectWallet();
    if (signer) {
      const accountAddress = await signer.getAddress();
      setUserAccount(accountAddress);
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setUserAccount(accounts[0]);
          }
        });
    }
  }, []);

  const TitanChainSDK = new MultiChainSDK({
    chainId: 5050,
  });
  const TON_CONTRACT = TitanChainSDK.getTokenContract("TON");

  useEffect(() => {
    const fetchTonBalance = async () => {
      const balance = await TON_CONTRACT.balanceOf(userAccount);
      const convertedBalance = weiToDecimal(balance);
      setTonBalance(Number(convertedBalance));
    };
    if (userAccount) {
      fetchTonBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAccount]);

  return { connectWallet, userAccount, tonBalance };
};
