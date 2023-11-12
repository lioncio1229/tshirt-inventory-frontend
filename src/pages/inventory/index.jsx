import { Grid, Box } from "@mui/material";
import Overview from "../../components/Overview";
import Menu from "./Menu";

export default function Inventory() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Overview
            overviews={[
              {
                label: "Total T-shirt",
                value: 100,
                sx: { bgcolor: "#f07b53" },
              },
              {
                label: "Total Categories",
                value: 3,
                sx: { bgcolor: "#f4b168" },
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
            <Menu />
        </Grid>
      </Grid>
    </Box>
  );
}
