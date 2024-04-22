import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useMediaQuery } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 25,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#77656538",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#2f3c93b5",
  },
}));

export default function UserMintProgress({ mintNum, max }) {
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
      <BorderLinearProgress
        variant="determinate"
        value={(mintNum / max) * 100}
      />

      <Typography
        gutterBottom
        variant="h5"
        component="div"
        textAlign={"center"}
      >
        {`${mintNum} of ${max} WCI NFTs you already minted.`}
      </Typography>
    </Stack>
  );
}
