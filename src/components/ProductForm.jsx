import {
  Grid,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import LabeledInputfield from "./LabeledInputField";

export default function ProductForm({
  title,
  submitLabel,
  onChange,
  onAutoCompleteChange,
  values = {},
  onSubmit,
  onCancel,
}) {
  return (
    <Grid container spacing={2} columnSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" color="secondary">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "lightgrey",
            height: { xs: "40vw", md: "21vw" },
            cursor: "pointer",
            transition: "background-color 0.5s",
            "&:hover": {
              bgcolor: "grey",
            },
          }}
        >
          <img src="" />
          <Typography>Click to add image</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LabeledInputfield
              id="name"
              label="Name"
              onChange={onChange}
              value={values.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledInputfield
              id="design"
              label="Design"
              onChange={onChange}
              value={values.design}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledInputfield
              id="size"
              label="Size"
              onChange={onChange}
              value={values.size}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledInputfield
              id="color"
              label="Color"
              onChange={onChange}
              value={values.color}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledInputfield
              id="quantityInStock"
              type="number"
              label="Quantity in Stock"
              onChange={onChange}
              value={values.quantityInStock}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledInputfield
              id="unitPrice"
              type="number"
              label="Unit Price"
              onChange={onChange}
              value={values.unitPrice}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
                value={values.category}
              isOptionEqualToValue={(option) =>
                option.id === values.category.id
              }
              getOptionLabel={(option) => option.name}
              disablePortal
              options={[
                { id: 1, name: "Any" },
                { id: 2, name: "Men" },
                { id: 3, name: "Women" },
                { id: 4, name: "Baby" },
                { id: 5, name: "Teen" },
                { id: 6, name: "Christmas" },
              ]}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              onChange={onAutoCompleteChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack flexDirection="row" gap={2}>
              <Button
                variant="contained"
                color="success"
                sx={{ minWidth: 130, textTransform: "capitalize" }}
                onClick={onSubmit}
              >
                {submitLabel}
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ minWidth: 130, textTransform: "capitalize" }}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
