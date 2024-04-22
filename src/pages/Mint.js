import { useState, forwardRef } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MintProgress from "../component/Progress";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LaunchIcon from "@mui/icons-material/Launch";
import Discord from "../assets/discord.png";
import NFTGif from "../assets/wcinft_diamond.gif";

import { useNFTContract, useWCIContract } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { toEth } from "../hooks/hook";
import UserMintProgress from "../component/MintProgress";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Mint() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { active, account } = useWeb3React();
  const [typedNum, setTypedNum] = useState(1);
  const [mintPrice, setMintPrice] = useState(0.06);
  const [mintNum, setMintNum] = useState(0);
  const [userMintLimit, setUserMintLimit] = useState(10);
  const [nftBalance, setNftbalance] = useState(0);
  const [mintStatus, setMintStatus] = useState("CHADList Mint is now LIve !");
  const [isLoading, setIsLoading] = useState(false);
  const [mintDisable, setMintDisable] = useState(false);
  const [isRequire, setIsRequire] = useState(false);
  const nftContract = useNFTContract();
  const wciContract = useWCIContract();

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
    type: "success",
  });

  const { vertical, horizontal, open, message, type } = state;

  const Mint = async () => {
    setIsLoading(true);
    const result = await nftContract.methods.mint(typedNum).send({
      from: account,
      value: toEth(typedNum * mintPrice),
    });
    if (result.status === true) {
      setState({
        ...state,
        open: true,
        message: "You have mint NFT successfully",
        type: "success",
      });
      GetUserInfo();
    } else {
      setState({
        ...state,
        open: true,
        message: "Error",
        type: "error",
      });
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const GetUserInfo = async () => {
    if (account) {
      const status = await nftContract.methods.mintStatus().call();

      switch (status) {
        case "for whitelist user":
          const isWhite = await nftContract.methods.whiteList(account).call();
          if (isWhite) {
            setUserMintLimit(20);
            setMintPrice(0.05);
            setIsRequire(true);
          }
          setMintStatus("CHADList Mint is now Live!");
          break;
        case "5k wci holding user":
          const isHolding =
            6000 * 10 ** 9 <=
            (await wciContract.methods.balanceOf(account).call());
          if (isHolding) {
            setMintPrice(0.05);
            setIsRequire(true);
          }
          setMintStatus("5k $WCI Holders Mint is now Live");
          break;
        case "public mint":
          setMintStatus("Public Mint is now Live");
          setIsRequire(true);
          break;
        default:
          setMintStatus("Public Mint is now Live");
          setIsRequire(true);
          break;
      }

      const balance = await nftContract.methods.balanceOf(account).call();
      setNftbalance(balance);

      const num = await nftContract.methods.totalSupply().call();
      setMintNum(num);
    }
  };

  const handleLinkClick = (link) => {
    window.open(link);
  };

  useEffect(() => {
    if (isRequire)
      setMintDisable(
        isRequire &&
          (userMintLimit < Number(nftBalance) + Number(typedNum) || !account)
      );
  }, [userMintLimit, nftBalance, typedNum, isRequire]);
  useEffect(() => {
    GetUserInfo();
  }, [active, account]);

  return (
    <Container>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        textAlign={"center"}
      >
        {"SHIBS of FOOTBALL by $WCI - NFT MINT"}
      </Typography>
      <MintProgress mintNum={mintNum} mintStatus={mintStatus} />
      {account && <UserMintProgress mintNum={nftBalance} max={userMintLimit} />}
      <Stack direction={"row"} sx={{ width: "300px", margin: "auto", my: 5 }}>
        <TextField
          id="filled-number"
          label="Enter Amont"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ flexGrow: 1 }}
          variant="filled"
          value={typedNum}
          onChange={(e) =>
            setTypedNum((prev) => (prev >= 0 ? e.target.value : 0))
          }
        />
        <LoadingButton
          loading={isLoading}
          loadingPosition="start"
          variant="outlined"
          disabled={!isRequire ? true : mintDisable}
          onClick={Mint}
          sx={{
            width: "300px",
            mx: 1,
            color: "#5dc3ff",
            border: "2px solid rgb(0 141 255)",
          }}
        >
          Mint Now
        </LoadingButton>
      </Stack>
      <Stack my={4}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          textAlign={"center"}
          color={"#5dc3ff"}
        >
          17 Nov - CHADList Mint - 0.05 ETH Mint Price
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          textAlign={"center"}
          color={"#5dc3ff"}
        >
          18 Nov - $WCI Holders Mint - 0.05 ETH Mint Price
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          textAlign={"center"}
          color={"#5dc3ff"}
        >
          19 Nov - Public Mint - 0.06 ETH Mint Price
        </Typography>
      </Stack>

      <Box width={"90%"} margin="auto">
        <Stack
          direction={isMobile ? "row" : "column"}
          justifyContent={"space-evenly"}
          alignItems="center"
          gap={isMobile ? "5px" : "15px"}
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            width={isMobile ? "30%" : "85%"}
            textAlign={isMobile ? "left" : "center"}
          >
            Shibs of Football is a collection by World Cup Inu, a decentralized,
            ethereum-native sports betting platform currently focused on the
            upcoming World Cup competition. Each NFT represents one of 32
            countries participating at the World Cup, and winning team holders
            will split a 450 eth mega jackpot, the largest ever recorded
            on-chain.
          </Typography>
          <Box
            component="img"
            src={NFTGif}
            sx={{ width: isMobile ? "30%" : "85%" }}
          ></Box>
        </Stack>
      </Box>
      <Stack
        my={8}
        direction="row"
        spacing={1}
        justifyContent="center"
        gap={"40px"}
      >
        <IconButton
          onClick={() => handleLinkClick("https://worldcupinu.app/")}
          aria-label="Site"
          size="large"
          color="primary"
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
            }}
          >
            <LaunchIcon sx={{ fontSize: "30px" }} />
          </Box>
        </IconButton>
        <IconButton
          onClick={() => handleLinkClick("https://twitter.com/wcierc20")}
          aria-label="Discord"
          size="large"
          color="info"
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
            }}
          >
            <TwitterIcon sx={{ fontSize: "30px" }} />
          </Box>
        </IconButton>
        <IconButton
          onClick={() => handleLinkClick("https://discord.gg/worldcupinu")}
          color="primary"
          aria-label="Discord"
          size="large"
        >
          <Box
            component="img"
            alt="Discord"
            src={Discord}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
        </IconButton>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={4000}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
