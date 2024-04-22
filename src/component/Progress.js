import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useMediaQuery } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 35,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#77656538",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#30a8e8b5",
  },
}));

export default function MintProgress({ mintNum, mintStatus }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Stack
      spacing={1}
      sx={{
        flexGrow: 1,
        width: isMobile ? "60%" : "85%",
        margin: "auto",
        my: 5,
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        textAlign={"center"}
        sx={{
          background: "linear-gradient(96.35deg, #F7BC14 0%, #E95E57 81.64%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          ml: 2,
          mt: 2,
        }}
      >
        {mintStatus}
      </Typography>
      <BorderLinearProgress
        variant="determinate"
        value={(mintNum / 10000) * 100}
      />

      <Typography
        gutterBottom
        variant="h5"
        component="div"
        textAlign={"center"}
      >
        {`${mintNum} of 10000 WCI NFT minted till now.`}
      </Typography>
    </Stack>
  );
}
