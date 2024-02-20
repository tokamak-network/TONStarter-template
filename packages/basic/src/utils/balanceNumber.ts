import { ethers } from "ethers";

export function weiToDecimal(wei: ethers.BigNumber): string {
  const decimal = ethers.utils.formatUnits(wei, 18);
  return parseFloat(decimal).toFixed(2);
}
