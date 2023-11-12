import { Stack, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function OtherActions() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/main/add-product");
  };

  return (
    <Stack direction="row">
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
    </Stack>
  );
}
