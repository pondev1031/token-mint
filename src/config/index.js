/* eslint-disable no-undef */
import BigNumber from "bignumber.js";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const RPC_URL = "https://mainnet.infura.io/v3/";
// export const RPC_URL = "https://goerli.infura.io/v3/";
export const TESTNET = 5;
export const MAINNET = 1;

export const Tokens = require("./token.json");
export const NFTContractAddress = "0xb485122ac60140e3e96b19fb8896758a94bac089";
export const WCIContractAddress = "0xC5a9BC46A7dbe1c6dE493E84A18f02E70E2c5A32";
