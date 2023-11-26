import {
  Modal,
  Button,
  Box,
  Paper,
  Container,
  Typography,
  Stack,
  Checkbox,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import DataTable from "../../components/DataTable";
import { useGetCustomersQuery } from "../../services/customerManagementService";
import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar";

export default function CustomerSelect({ open, onSelect, onClose }) {
  const { data, refetch } = useGetCustomersQuery();
  const [selectedId, setSelectedId] = useState(null);

  const columns = [
    {
      label: "",
      formatter: (params) => {
        return (
          <Checkbox
            checked={params.id === selectedId}
            onChange={() => handleCheckboxChange(params.id)}
          />
        );
      },
    },
    { id: "email", label: "Email" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "streetAddress", label: "Street Address" },
    { id: "city", label: "City" },
    { id: "province", label: "Province" },
    { id: "postalCode", label: "Postal Code" },
    { id: "phoneNumber", label: "Phone Number" },
  ];

  const handleCheckboxChange = (itemId) => {
    setSelectedId(itemId === selectedId ? null : itemId);
  };

  const handleSelect = () => {
    if (!data) return;

    onSelect(data.find((item) => item.id === selectedId));
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    refetch();
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <Paper sx={{ p: 3, height: "90vh", position: "relative" }}>
            <Stack flexDirection="row" alignItems="center" mb={2} gap={1}>
              <Person fontSize="large" color="secondary" />
              <Typography variant="h6" color="primary">
                Select Customer
              </Typography>
            </Stack>
            {/* <Searchbar sx={{ mb: 2 }} /> */}
            <DataTable
              columns={columns}
              rows={data ? data : []}
              stickyHeader
              sx={{
                height: "calc(100% - 150px)",
                "& .css-rorn0c-MuiTableContainer-root": {
                  maxHeight: "100%",
                },
              }}
            />
            <Stack
              gap={2}
              sx={{
                position: "absolute",
                bottom: 10,
                right: 20,
                flexDirection: "row",
              }}
            >
              <Button
                variant="contained"
                color="success"
                size="large"
                disabled={!selectedId}
                onClick={handleSelect}
              >
                Select
              </Button>
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={onClose}
              >
                Back
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
}
