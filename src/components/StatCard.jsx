import { Card, CardContent, Typography, Stack } from "@mui/material";
import { Inventory } from "@mui/icons-material";

function StatCard({ label, value, sx = {} }) {
  return (
    <Card sx={{ color: "#fff", minWidth: 200, ...sx }}>
      <CardContent>
        <Stack direction="row" alignItems="center" gap={2}>
          <Inventory />
          <Stack>
            <Typography>{label}</Typography>
            <Typography variant="h6">{value}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default StatCard;
