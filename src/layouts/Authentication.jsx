import { Outlet } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import isTokenExpired from "../utils/isTokenExpired";
import ClothingBg from "../assets/clothing.webp";

export default function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        if(!isTokenExpired(decoded))
        {
            navigate("/main");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <Box sx={{
      backgroundImage: `url(${ClothingBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100vh"
    }}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            pt: 3,
          }}
        >
          <Typography variant="h2" color="primary">
            Clothing T-shirt Inventory
          </Typography>
          <Box maxWidth={420}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </Box>

  );
}
