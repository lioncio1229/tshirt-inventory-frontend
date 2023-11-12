import {Stack, Button} from "@mui/material";
import { Add } from "@mui/icons-material";

export default function OtherActions()
{
    return (
        <Stack direction="row">
            <Button variant="contained" startIcon={<Add />}>Add Product</Button>
        </Stack>
    )   
}