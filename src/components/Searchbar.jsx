import { Stack, TextField, Button } from "@mui/material"

export default function Searchbar() {
  return (
    <Stack direction="row" spacing={2}>
      <TextField size="small" placeholder="Search" />
      <Button variant="contained" size="small"> Search </Button>
    </Stack>
  );
}
