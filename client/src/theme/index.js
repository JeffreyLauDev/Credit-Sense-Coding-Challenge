import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.cyan[700],
    },
    secondary: {
      main: "#272c34",
    },
    yellow: {
      main: "#f7941d",
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
    },
  },
  shadows,
  typography,
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: "0 0 12px 0 rgba(186,213,241,.3)!important",
      },
      elevation0: {
        boxShadow: "0 0 12px 0 rgba(186,213,241,.3)!important",
      },
    },
  },
});

export default theme;
