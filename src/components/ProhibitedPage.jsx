import { Container, Stack, Typography } from "@mui/material";

export default function ProhibitedPage(){

    return (
        <Container maxWidth="xs">
            <Stack
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignContent: "center",
                    height: "70vh"
                }}
            >
                <Typography variant="h3" color="error" textAlign="center">No Access</Typography>
                <Typography>You have no access to the your requested route</Typography>
            </Stack>
        </Container>
    )
}