import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { RPC_URL } from "../config";
import { MAINNET } from "../config";

import MetaMaskLogo from "../assets/wallets/meta-mask.svg";
import WalletConnect from "../assets/wallets/wallet-connect.svg";
const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
  supportedChainIds: [MAINNET],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { MAINNET: RPC_URL },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const Wallets = [
  {
    title: "WalletConnect",
    description: "Connect to your WalletConnect Wallet",
    logo: WalletConnect,
    connector: walletconnect,
  },
  {
    title: "MetaMask",
    description: "Connect to your MetaMask Wallet",
    logo: MetaMaskLogo,
    connector: injected,
  },
];

export const ConnectedWallet = () => {
  const { connector } = useWeb3React();
  if (connector) {
    // eslint-disable-next-line default-case
    switch (connector) {
      case injected: {
        return {
          name: "MetaMask",
          logo: MetaMaskLogo,
        };
      }
      case walletconnect: {
        return {
          name: "WalletConnect",
          logo: WalletConnect,
        };
      }
    }
  } else {
    return {};
  }
};
