import * as React from "react";
import { Dispatch, SetStateAction, FunctionComponent } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import "./Navbar.css";
import CheckIcon from "@mui/icons-material/Check";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { Link as Linknew } from "react-router-dom";

const theme = createTheme({
  typography: {
    allVariants: {
      textTransform: "none",
    },
  },
});
interface props {
  user: boolean;
  logout: any;
}
const Navbar = (props: props) => {
  const username: string | null = window.localStorage.getItem("name");
  const logout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("id");
    window.location.pathname = "/login";
  };

  function conditionalRender() {
    if (props.user) {
      return (
        <Button
          variant="outlined"
          color="warning"
          onClick={props.logout}
          sx={{ my: 1 }}
        >
          Logout
        </Button>
      );
    }
    if (!props.user) {
      return (
        <>
          <Button
            variant="outlined"
            disableRipple
            color="warning"
            sx={{ my: 1 }}
          >
            <Linknew
              style={{ textDecoration: "none", color: "#f57c00" }}
              to="/register"
            >
              Register
            </Linknew>
          </Button>
          <Button
            variant="outlined"
            disableRipple
            color="warning"
            sx={{ my: 1, mx: 1 }}
          >
            <Linknew
              style={{ textDecoration: "none", color: "#f57c00" }}
              to="/login"
            >
              Login
            </Linknew>
          </Button>
        </>
      );
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Link href="/todos" underline="none" color="inherit">
                <span className="header-logo">TO-DO APP</span>
              </Link>
              <CheckIcon fontSize="small" style={{ verticalAlign: "middle" }} />
            </Typography>
            {conditionalRender()}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Navbar;
