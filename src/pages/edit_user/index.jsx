import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LabeledInputfield from "../../components/LabeledInputField";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../services/userManagementService";
import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

import { enqueueSnackbar } from "notistack";

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, refetch } = useGetUserQuery({ id });
  const [updateUser] = useUpdateUserMutation();

  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    roleId: 4,
    isActive: false,
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

  const handleCheckboxChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.checked });
  };

  const handleRoleChange = (e) => {
    setUser({ ...user, roleId: e.target.value });
  };

  const modelValid = () => {
    const { fullName } = user;
    let error = "";

    if (fullName.trim() === "") {
      error = "Require Name"
    }

    if(error === "") return true;
    
    enqueueSnackbar(error);
    return false;
  };

  const handleSubmit = () => {
    if (!modelValid()) return;

    dispatch(setBarLoading(true));

    updateUser({ id, model: user })
      .then((rep) => {
        handleClose();
        dispatch(setBarLoading(false));
        enqueueSnackbar("User updated sucessfully", { variant: "success" });
      })
      .catch((err) => {
        dispatch(setBarLoading(false));
        console.err(err);
        enqueueSnackbar("Can't update user", { variant: "error" });
      });
  };

  const handleClose = () => {
    navigate("/main/manage-users");
  };

  useEffect(() => {
    if (!data) return;

    setUser({
      fullName: data.fullName,
      roleId: data.role.id,
      isActive: Boolean(data.isActived),
    });
    setEmail(data.email);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <Container maxWidth="xs">
      <Stack spacing={3}>
        <Typography variant="h5" color="primary">
          Edit user
        </Typography>

        <LabeledInputfield label="Email" value={email} disabled />
        <LabeledInputfield
          id="fullName"
          label="Fullname"
          onChange={handleInputChange}
          value={user.fullName}
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

        <FormControlLabel
          control={
            <Checkbox
              id="isActive"
              checked={user.isActive}
              onChange={handleCheckboxChange}
            />
          }
          label="Is active"
        />

        <Stack flexDirection="row" gap={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ minWidth: 130, textTransform: "capitalize" }}
            onClick={handleSubmit}
          >
            Update
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
