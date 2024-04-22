import { useEffect, useState } from "react";
import useWeb3 from "./useWeb3";
import NFT from "../config/token.json";
import WCI from "../config/erc20.json";
import { NFTContractAddress, WCIContractAddress } from "../config";
const useContract = (abi, address, contractOptions) => {
  const web3 = useWeb3();
  const [contract, setContract] = useState(
    new web3.eth.Contract(abi, address, contractOptions)
  );

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions));
  }, [abi, address, contractOptions, web3]);

  return contract;
};

/**
 * Helper hooks to get specific contracts (by ABI)
 */
export const useNFTContract = () => {
  return useContract(NFT, NFTContractAddress);
};
export const useWCIContract = () => {
  return useContract(WCI, WCIContractAddress);
};
