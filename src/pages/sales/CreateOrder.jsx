import {
  Modal,
  Button,
  Box,
  Paper,
  Container,
  Typography,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import { Person, ProductionQuantityLimits } from "@mui/icons-material";
import CustomerSelect from "./CustomerSelect";
import ProductSelect from "./ProductSelect";
import { useState } from "react";

export default function CreateOrder({ open, onCreate, onClose }) {
  const [openCustomerSelect, setOpenCustomerSelect] = useState(false);
  const [openProductSelect, setOpenProductSelect] = useState(false);

  const [customer, setCustomer] = useState(null);
  const [product, setProduct] = useState(null);

  const handleCustomerSelect = (selectedCustomer) => {
    setCustomer(selectedCustomer);
    setOpenCustomerSelect(false);
  };

  const handleProductSelect = (selectedProduct) => {
    setProduct(selectedProduct);
    setOpenProductSelect(false);
  };

  const handleCancel = () => {
    setCustomer(null);
    setProduct(null);
    onClose && onClose();
  }


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
        <Container maxWidth="md">
          <Paper sx={{ p: 3 }}>
            <Stack spacing={5}>
              <Typography variant="h5" fontWeight="600" color="primary">
                Create order
              </Typography>

              <Grid container columnSpacing={2}>
                <Grid item xs={7}>
                  <TextField
                    value={customer ? customer.firstName + " " + customer.lastName : "Customer"}
                    disabled
                    fullWidth
                    sx={{ ml: -2 }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      textTransform: "capitalize",
                      height: "100%",
                      ml: -2,
                    }}
                    fullWidth
                    startIcon={<Person />}
                    onClick={() => setOpenCustomerSelect(true)}
                  >
                    Select Customer
                  </Button>
                </Grid>
              </Grid>

              <Grid container columnSpacing={2}>
                <Grid item xs={7}>
                  <TextField
                    value={product ? product.name : "Product"}
                    disabled
                    fullWidth
                    sx={{ ml: -2 }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      textTransform: "capitalize",
                      height: "100%",
                      ml: -2,
                    }}
                    fullWidth
                    startIcon={<ProductionQuantityLimits />}
                    onClick={() => setOpenProductSelect(true)}
                  >
                    Select Product
                  </Button>
                </Grid>
              </Grid>

              <Grid container columnSpacing={2}>
                <Grid item xs={6} sx={{ ml: -2 }}>
                  <Button variant="contained" size="large" fullWidth>
                    Create
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="error"
                    fullWidth
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
          <CustomerSelect
            open={openCustomerSelect}
            onSelect={handleCustomerSelect}
            onClose={() => setOpenCustomerSelect(false)}
          />
          <ProductSelect
            open={openProductSelect}
            onSelect={handleProductSelect}
            onClose={() => setOpenProductSelect(false)}
          />
        </Container>
      </Box>
    </Modal>
  );
}
