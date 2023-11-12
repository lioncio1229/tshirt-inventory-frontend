import {Grid, Box} from "@mui/material";
import Overview from "../../components/Overview";

export default function Inventory()
{
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Overview overviews={[{label: "Total T-shirt", value: 100}, {label: "Total Categories", value: 3}]} />
                </Grid>
            </Grid>
        </Box>
    )
}