import * as React from "react";
import "./Navbar.css";
import { Link as Linknew } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import CheckIcon from "@mui/icons-material/Check";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  username: any;
}

const Navbar = (props: props) => {
  function conditionalRender() {
    if (props.user) {
      return (
        <Button
          variant="outlined"
          color="warning"
          onClick={props.logout}
          sx={{ my: 1 }}
        >
          Logout from {props.username}
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
              <Linknew
                to="/todos"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <span className="header-logo">TO-DO APP</span>
              </Linknew>

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
