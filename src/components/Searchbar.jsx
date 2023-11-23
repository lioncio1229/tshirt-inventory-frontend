import { useState, useRef, useEffect } from "react";
import { Stack, TextField, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material";

export default function Searchbar({value, onChangeEnd, searchAfter=1000, placeholder="Search", sx}) {
  const valueRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("");

  const handleOnChange = (e) => {
    if(valueRef.current){
      clearTimeout(valueRef.current);
    }

    const newValue = e.target.value;

    setCurrentValue(newValue);

    valueRef.current = setTimeout(() => {
      onChangeEnd && onChangeEnd(newValue);
    }, searchAfter);
  }

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    () => {
      if(valueRef.current)
        clearTimeout(valueRef.current);
    }
  }, []);

  return (
    <Stack direction="row" spacing={2} sx={{...sx}}>
      <TextField size="small" value={currentValue} onChange={handleOnChange} placeholder={placeholder} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search/>
          </InputAdornment>
        )
      }}/>
    </Stack>
  );
}
