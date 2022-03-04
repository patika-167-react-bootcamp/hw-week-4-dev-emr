import * as React from "react";
import { Dispatch, SetStateAction, FunctionComponent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useForm from "./useForm";
import { useFormType } from "./useForm";
import axios from "../../../api/axios";
import { useContext } from "react";
import LoadingIcon from "../../LoadingIcon/LoadingIcon";

const LOGIN_URL = "/auth/login";

const theme = createTheme();

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false);
  const form: useFormType = useForm();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          username: form.values.username,
          password: form.values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      const accessToken = response?.data?.token;
      const name = response?.data?.username;
      const id = response?.data?.id;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("name", name);
      localStorage.setItem("id", id);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error("Error!");
    }
  };
  const loginFormValid =
    !form.values.username?.length || !form.values.password?.length;

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
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

            <Button
              type="submit"
              disabled={loginFormValid}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="/todos"
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
