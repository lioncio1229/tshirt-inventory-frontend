import { useState } from "react";
import {
  Stack,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import LabeledInputfield from "../../components/LabeledInputField";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../services/userManagementService";
import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

import { enqueueSnackbar } from "notistack";

export default function AddUser() {
  const dispatch = useDispatch();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    roleId: 4,
    fullName: "",
    password: "",
  });

  const roles = [
    { label: "Admin", value: 1 },
    { label: "Sales", value: 2 },
    { label: "Report", value: 3 },
    { label: "User", value: 4 },
  ];

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setUser({ ...user, roleId: e.target.value });
  };

  const modelValid = () => {
    const { email, fullName, password } = user;
    let error = "";

    if (email.trim() === "") {
      error = "Please add email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = "Invalid email";
    } else if (fullName.trim() === "") {
      error = "Require Name"
    } else if (password.trim() === "") {
      error = "Require password"
    }

    if(error === "") return true;
    
    enqueueSnackbar(error);
    return false;
  };

  const handleSubmit = () => {
    if(!modelValid()) return;

    dispatch(setBarLoading(true));
    addUser(user)
      .then((resp) => {
        navigate("/main/manage-users");
        dispatch(setBarLoading(false));
        enqueueSnackbar("User added sucessfully", { variant: "success" });
      })
      .catch((err) => {
        console.err(err);
        dispatch(setBarLoading(false));
        enqueueSnackbar("Can't add user", { variant: "error" });
      });
  };

  const handleClose = () => {
    navigate("/main/manage-users");
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={3} mb={10}>
        <Typography variant="h5" color="primary">
          Add New user
        </Typography>

        <LabeledInputfield
          id="email"
          label="Email"
          onChange={handleInputChange}
          value={user.email}
        />
        <LabeledInputfield
          id="fullName"
          label="Fullname"
          onChange={handleInputChange}
          value={user.fullName}
        />
        <LabeledInputfield
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          onChange={handleInputChange}
          value={user.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.roleId}
            label="Role"
            onChange={handleRoleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Is active"
        /> */}

        <Stack flexDirection="row" gap={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ minWidth: 130, textTransform: "capitalize" }}
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ minWidth: 130, textTransform: "capitalize" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
