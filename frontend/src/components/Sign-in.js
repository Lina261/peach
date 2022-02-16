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
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(baseUrl + "token/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      let tokens = await response.json();
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      navigate("/home", { replace: true });
    } else {
      setErrorMessage("Email or password is invalid");
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
        {/*<Avatar sx={{ m: 10, bgcolor: "secondary.main" }}>*/}
        <img
          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-peach-fruit-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
          alt="peach"
        />
        {/*</Avatar>*/}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, textAlign: "center" }}
        >
          {errorMessage ? (
            <Typography sx={{ color: "red" }}> {errorMessage}</Typography>
          ) : (
            ""
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!errorMessage}
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            error={!!errorMessage}
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button type="submit" fullWidth variant="contained">
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/*<Link href="#" variant="body2">*/}
              {/*  Forgot password?*/}
              {/*</Link>*/}
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
