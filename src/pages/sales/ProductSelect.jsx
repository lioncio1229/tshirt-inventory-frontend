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
import { ProductionQuantityLimits } from "@mui/icons-material";
import DataTable from "../../components/DataTable";
import { useGetShirtsWithoutPaginationQuery } from "../../services/tshirtManagementService";
import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar";

export default function ProductSelect({ open, onSelect, onClose }) {
  const [productName, setProductName] = useState("");
  const { data, refetch } = useGetShirtsWithoutPaginationQuery(productName);
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
    { id: "name", label: "Name" },
    { id: "design", label: "Design" },
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "unitPrice", label: "Unit Price" },
    { id: "quantityInStock", label: "Quantity in Stock" },
    {
      id: "categoryName",
      label: "Category Name",
      formatter: (params) => {
        return params.category.name;
      },
    },
  ];

  const handleCheckboxChange = (itemId) => {
    setSelectedId(itemId === selectedId ? null : itemId);
  };

  const handleSelect = () => {
    if (!data) return;

    onSelect(data.find((item) => item.id === selectedId));
    onClose();
  };

  const handleSearchChange = (value) => {
    setProductName(value);
  }

  useEffect(() => {
    if (!open) return;

    refetch();

    return () => {
      setProductName("");
    }

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
          <Paper sx={{ p: 3, height: "90vh", position: "relative", overflow: "hidden" }}>
            <Stack flexDirection="row" alignItems="center" mb={2} gap={1}>
              <ProductionQuantityLimits fontSize="large" color="secondary" />
              <Typography variant="h6" color="primary">
                Product Select
              </Typography>
            </Stack>
            <Searchbar
              sx={{ mb: 2 }}
              value={productName}
              onChangeEnd={handleSearchChange}
              searchAfter={500}
              placeholder="Search by name"
            />
            <DataTable
              columns={columns}
              rows={data ? data : []}
              stickyHeader
              sx={{
                height: "calc(100% - 150px)",
                "& .css-rorn0c-MuiTableContainer-root": {
                  maxHeight: "100%"
                }
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
