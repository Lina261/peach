import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    username: "",
  });

  const checkEmail = () => {
    const isValid = (() => {
      if (email.length < 10) {
        return false;
      }
      // debugger;
      return email.match(/\S+@\S+\.\S+/);
    })();
    // !(email.length < 10 || email.length > 30) && email.match(/\S+@\S+\.\S+/);

    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      email: isValid
        ? ""
        : "Enter correct email. Email should contain '@'. Enter email address with length 10-30 symbols.",
    }));
    return isValid;
  };

  const checkUsername = () => {
    if (username.length < 3) {
      setErrorMessage({
        ...errorMessage,
        username: "Too short name",
      });
      return false;
    } else if (username.length > 30) {
      setErrorMessage({
        ...errorMessage,
        username: "Too long name",
      });
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (!password.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")) {
      setErrorMessage({
        ...errorMessage,
        password:
          "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
      });
      return false;
    }
    return true;
  };

  const validated = () => {
    return checkEmail() && checkUsername() && checkPassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validated()) {
      const response = await fetch(baseUrl + "register/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, username, password }),
      });
      if (response.status === 201) {
        console.log("Registered");
        navigate("/", { replace: true });
      }
    }
  };

  return (
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
        <img
          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-peach-fruit-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
          alt="peach"
        />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={!!errorMessage.email}
            helperText={errorMessage.email}
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            error={!!errorMessage.username}
            helperText={errorMessage.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!errorMessage.password}
            helperText={errorMessage.password}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up"> Create account </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
