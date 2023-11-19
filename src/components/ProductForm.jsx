import {
  Grid,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import LabeledInputfield from "./LabeledInputField";
import GalleryIcon from "../assets/gallery.png";
import { useRef } from "react";

export default function ProductForm({
  title,
  submitLabel,
  onChange,
  imageFile,
  onImageChange,
  onAutoCompleteChange,
  values = {},
  onSubmit,
  onCancel,
}) {
  const imageInputRef = useRef(null);

  const handleImageClick = () => {
    if (!imageInputRef.current) return;

    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSizeInBytes) {
      alert("File size exceeds the maximum limit of 5MB.");
      return;
    }

    onImageChange && onImageChange(file);
  };

  return (
    <Grid container spacing={2} columnSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary">
          {title}
        </Typography>
      </Grid>

      <Grid item xs={6} md={3}>
        <Box
          ref={imageInputRef}
          component="input"
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageChange}
          sx={{
            display: "none",
          }}
        />
        {imageFile ? (
          <Paper
            sx={{
              height: { xs: "40vw", md: "21vw" },
              position: "relative",
              cursor: "pointer",
              "&:hover .css-yrq8zb-MuiChip-root": {
                opacity: 1,
                transition: "opacity 0.3s",
              },
            }}
            onClick={handleImageClick}
          >
            <Chip
              label="Change Image"
              variant="contained"
              color="secondary"
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
              }}
            />
            <Box
              component="img"
              src={URL.createObjectURL(imageFile)}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Paper>
        ) : (
          <Box
            sx={{
              bgcolor: "grey.300",
              height: { xs: "40vw", md: "21vw" },
              cursor: "pointer",
              transition: "background-color 0.5s",
              p: 1.5,
              "&:hover": {
                bgcolor: "grey.400",
              },
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='white' stroke-width='5' stroke-dasharray='6%2c 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
            border-radius: 15px;`,

                "&:hover img": {
                  transform: "scale(1.12)",
                },
              }}
              onClick={handleImageClick}
            >
              <Box
                component="img"
                src={GalleryIcon}
                sx={{
                  width: "27%",
                  height: "auto",
                  mb: 2,
                  transition: "transform 0.5s",
                }}
              />
              <Typography>Click to add image</Typography>

              <Typography fontSize={10} color="grey.500">
                Max file size:{" "}
                <Typography
                  component="span"
                  fontSize="inherit"
                  color="grey.600"
                  fontWeight={600}
                >
                  5MB
                </Typography>
              </Typography>

              <Typography fontSize={10} color="grey.500">
                Supported file types:
                <Typography
                  component="span"
                  fontSize="inherit"
                  color="grey.600"
                  fontWeight={600}
                >
                  JPG, JPEG, PNG
                </Typography>
              </Typography>
            </Box>
          </Box>
        )}
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
                color="secondary"
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
