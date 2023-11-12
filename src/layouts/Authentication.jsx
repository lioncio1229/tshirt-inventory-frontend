import { Outlet } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

export default function Authentication()
{
    return (
    <Container component="main" maxWidth="md">
        <Box sx={{
            display: "flex", 
            alignItems: "center", 
            flexDirection: "column",
            mt: 3
        }}>
            <Typography variant="h2" color="primary">Clothing T-shirt Inventory</Typography>
            <Box maxWidth={420}>
                <Outlet/>
            </Box>
        </Box>
    </Container>)
}