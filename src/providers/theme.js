import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }) => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    breakpoints: {
      values: {
        xxs: 0, // small phone
        xs: 425, // phone
        sm: 600, // tablets
        md: 900, // small laptop
        lg: 1200, // desktop
        xl: 1536, // large screens
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { background: "transparent" },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MaterialThemeProvider;
