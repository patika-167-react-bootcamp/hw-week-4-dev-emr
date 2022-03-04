import * as React from "react";
import { Dispatch, SetStateAction, FunctionComponent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormType } from "./useForm";
import useForm from "./useForm";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const REGISTER_URL = "/auth/register";
interface props {
  authenticate: any;
  setToken: any;
}
export default function SignUp(props: props) {
  const form: useFormType = useForm();
  const navigate = useNavigate();
  const registerFormValid =
    !form.values.username?.length ||
    !form.values.password?.length ||
    !form.values.passwordConfirm?.length;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: form.values.username,
          password: form.values.password,
          passwordConfirm: form.values.passwordConfirm,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.token;
      const name = response?.data?.username;
      const id = response?.data?.id;
      props.setToken(accessToken);
      props.authenticate();
      navigate("todos");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              size="small"
              variant="standard"
              onChange={form.onChange}
              value={form.values.username}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              variant="standard"
              onChange={form.onChange}
              value={form.values.password}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Password Confirm"
              type="password"
              id="passwordConfirm"
              autoComplete="current-password"
              size="small"
              variant="standard"
              onChange={form.onChange}
              value={form.values.passwordConfirm}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={registerFormValid}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
