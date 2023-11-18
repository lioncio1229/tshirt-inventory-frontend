import { Stack, TextField, Button, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material";

export default function Searchbar({sx}) {
  return (
    <Stack direction="row" spacing={2} sx={{...sx}}>
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
