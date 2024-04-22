import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import logo from "../assets/logo.png";
import Cwallet from "./Cwallet";
import { useWeb3React } from "@web3-react/core";
import { useMediaQuery } from "@mui/material";

export default function Header() {
  const { active, account, library } = useWeb3React();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [balance, setBalance] = useState(0);
  const onConnectWallet = async () => {
    setIsOpenDialog(true);
  };

  useEffect(() => {
    (async () => {
      if (account) {
        const value = await library.getBalance(account);
        setBalance(value / 10 ** 18);
      }
    })();
  }, [account]);

  return (
    <Toolbar sx={{ background: "#23e1e614" }}>
      <Box
        sx={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          cursor: "pointer",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ height: isMobile ? "80%" : "50%" }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "flex-end",
          py: 1,
        }}
      >
        {active ? (
          <Button
            size="large"
            sx={{ textTransform: "unset", mx: 2 }}
            variant="outlined"
            onClick={onConnectWallet}
          >
            {account.substring(0, 5)} ...{" "}
            {account.substring(account.length - 4)}
            {` | ${balance.toFixed(3)} ETH`}
          </Button>
        ) : (
          <Button
            size="large"
            sx={{ textTransform: "unset", mx: 2 }}
            variant="outlined"
            onClick={onConnectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </Box>
      <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
    </Toolbar>
  );
}
