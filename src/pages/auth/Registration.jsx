import { useEffect, useState, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useRegisterMutation } from "../../services/authManagementService";
import { useNavigate } from "react-router-dom";

export default function Registration() {

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const [error, setError] = useState({
    emailError: "",
    fullNameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [errorState, setErrorState] = useState({
    emailHasError: true,
    fullNameHasError: true,
    passwordHasError: true,
    confirmPasswordHasError: true,
  });
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEnabled = useMemo(() => Object.values(errorState).every(item => !item), [errorState]);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email").trim();
    const fullName = data.get("fullName").trim();
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    const model = {
      email,
      fullName,
      password,
    };

    register(model).unwrap().then(resp => {
      localStorage.setItem("token", resp.token);
      navigate("/main");
    });
  };

  const handleEmailInputChange = (e) => {
    const { value } = e.target;
    const email = value.trim();
    let errorValue = "";
    let hasError = false;

    if(email.trim() === "")
    {
      errorValue = "Please add email";
      hasError = true;
    }
    else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
    {
      errorValue = "Invalid email";
      hasError = true;
    }

    setError({...error, emailError: errorValue});
    setErrorState({...errorState, emailHasError: hasError});
  }

  const handleFullNameInputChange = (e) => {
    const { value } = e.target;
    const fullName = value.trim();
    let errorValue = "";
    let hasError = false;

    if(fullName === "") {
      errorValue = "Please add your full name";
      hasError = true;
    }

    setError({...error, fullNameError: errorValue});
    setErrorState({...errorState, fullNameHasError: hasError});
  }

  const handlePasswordInputChange = (e) => {
    const { value: password } = e.target;

    let errorValue = "";
    let hasError = false;

    if(password.length < 6){
      errorValue = "Password characters minimum of 6";
      hasError = true;
    }

    setError((error) => ({...error, passwordError: errorValue}));
    setErrorState({...errorState, passwordHasError: hasError});
    setPassword(password);
  }
  
  const handleConfirmPasswordInputChange = (e) => {
    const { value: confirmPassword } = e.target;

    let errorValue = "";
    let hasError = false;

    if(confirmPassword !== password){
      errorValue = "Password not matched";
      hasError = true;
    }

    setError((error) => ({...error, confirmPasswordError: errorValue}));
    setErrorState({...errorState, confirmPasswordHasError: hasError});
    setConfirmPassword(confirmPassword);
  }

  useEffect(() => {
    let errorValue = "";
    let hasError = false;

    if(confirmPassword.length > 0 && password !== confirmPassword)
    {
      errorValue = "Password not matched";
    }
    if(password !== confirmPassword)
    {
      hasError = true;
    }

    setError((error) => ({...error, confirmPasswordError: errorValue}));
    setErrorState({...errorState, confirmPasswordHasError: hasError});

  }, [password]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
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
              error={error.emailError.length > 0}
              helperText={error.emailError}
              onChange={handleEmailInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="fullName"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              autoFocus
              error={error.fullNameError.length > 0}
              helperText={error.fullNameError}
              onChange={handleFullNameInputChange}
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
              error={error.passwordError.length > 0}
              helperText={error.passwordError}
              onChange={handlePasswordInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              error={error.confirmPasswordError.length > 0}
              helperText={error.confirmPasswordError}
              onChange={handleConfirmPasswordInputChange}
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
          Register
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/" variant="body2">
              Already have an account? Login in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
