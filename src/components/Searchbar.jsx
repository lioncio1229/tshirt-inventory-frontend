import { useState, useRef, useEffect } from "react";
import { Stack, TextField, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material";

export default function Searchbar({onChangeEnd, searchAfter=1000, sx}) {
  const valueRef = useRef(null);
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    if(valueRef.current){
      clearTimeout(valueRef.current);
    }

    const newValue = e.target.value;

    setValue(newValue);

    valueRef.current = setTimeout(() => {
      onChangeEnd && onChangeEnd(newValue);
    }, searchAfter);
  }

  useEffect(() => {
    () => {
      if(valueRef.current)
        clearTimeout(valueRef.current);
    }
  }, []);

  return (
    <Stack direction="row" spacing={2} sx={{...sx}}>
      <TextField size="small" value={value} onChange={handleOnChange} placeholder="Search" InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search/>
          </InputAdornment>
        )
      }}/>
    </Stack>
  );
}
