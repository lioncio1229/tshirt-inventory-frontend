import { useState, useEffect } from "react";
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

import { Add, Remove } from "@mui/icons-material";

export default function QuantityManager({
  open,
  productImage,
  productName,
  productQuantity,
  onQuantityUpdate,
  onClose,
}) {

  const [quantity, setQuantity] = useState(0);
  const [input, setInput] = useState(0);

  const add = () => {
    setQuantity(quantity + input);
    setInput(0);
  }
  
  const remove = () => {
    setQuantity(quantity - input);
    setInput(0);
  }

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

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
        <Container maxWidth="xs">
          <Paper sx={{ p: 2.3 }}>
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight="600" color="primary">
                Update Quantity
              </Typography>
              <Grid container gap={2}>
                <Grid item xs={5}>
                  <Box
                    component="img"
                    src={productImage}
                    sx={{
                      width: 130,
                      height: "auto",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="600" mb={1.2}>
                    {productName}
                  </Typography>
                  <Typography fontSize={12} color="grey.700">
                    Current Quantity
                  </Typography>
                  <Typography fontWeight="600" fontSize={20} color="secondary">
                    {quantity}
                  </Typography>
                </Grid>
              </Grid>
              <Stack gap={1} flexDirection="row" alignItems="center">
                <TextField
                  type="number"
                  size="small"
                  sx={{
                    minWidth: "45%",
                    "& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                  }}
                  fullWidth
                  value={input}
                  onChange={(e) => setInput(parseInt(e.target.value))}
                />
                <Button
                  sx={{ textTransform: "capitalize", height: "100%" }}
                  fullWidth
                  startIcon={<Add />}
                  variant="outlined"
                  onClick={add}
                >
                  Add
                </Button>
                <Button
                  sx={{ textTransform: "capitalize", height: "100%" }}
                  fullWidth
                  startIcon={<Remove />}
                  color="error"
                  variant="outlined"
                  onClick={remove}
                >
                  Remove
                </Button>
              </Stack>

              <Grid container columnSpacing={2} sx={{pt: 2}}>
                <Grid item xs={6} sx={{ ml: -2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => onQuantityUpdate && onQuantityUpdate(quantity)}
                  >
                    Update
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="error"
                    fullWidth
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
}
