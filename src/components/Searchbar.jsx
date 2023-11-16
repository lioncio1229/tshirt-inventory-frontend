import { Stack, TextField, Button, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material";

export default function Searchbar() {
  return (
    <Stack direction="row" spacing={2}>
      <TextField size="small" placeholder="Search" InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search/>
          </InputAdornment>
        )
      }}/>
    </Stack>
  );
}
