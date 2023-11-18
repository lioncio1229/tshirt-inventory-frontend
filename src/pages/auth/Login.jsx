import { useState, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useLoginMutation } from "../../services/authManagementService";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const [errorState, setErrorState] = useState({
    emailHasError: true,
    passwordHasError: true,
  });

  const isEnabled = useMemo(() => Object.values(errorState).every(item => !item), [errorState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const model = {
      email: data.get("email"),
      password: data.get("password")
    };

    login(model).unwrap().then(resp => {
      localStorage.setItem("token", resp.token);
      navigate("/main");
    });
  };

  const handleEmailInputChange = (e) => {
    const { value } = e.target;
    const email = value.trim();
    let hasError = false;

    if(email.trim() === "")
    {
      hasError = true;
    }

    setErrorState({...errorState, emailHasError: hasError});
  }

  const handlePasswordInputChange = (e) => {
    const { value: password } = e.target;
    let hasError = false;

    if(password === ""){
      hasError = true;
    }

    setErrorState({...errorState, passwordHasError: hasError});
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleEmailInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handlePasswordInputChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isEnabled}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/register" variant="body2">
              Don&apos;t have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
