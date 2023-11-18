import { useEffect, useState } from "react";
import { ButtonGroup, Button, TextField } from "@mui/material";

export default function InputCounter({ onChange }) {
  const [counter, setCounter] = useState(0);

  const handleCounterInputChange = (e) => {
    setCounter(parseInt(e.target.value));
  };

  useEffect(() => {
    onChange && onChange(counter);
  }, [counter, onChange]);

  return (
    <ButtonGroup size="small" sx={{ height: 40 }}>
      <Button
        onClick={() => setCounter(counter > 0 ? counter - 1 : 0)}
        variant="contained"
      >
        -
      </Button>
      <TextField
        type="number"
        onChange={handleCounterInputChange}
        value={counter}
        size="small"
        sx={{
          width: 50,
          "& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
            {
              "-webkit-appearance": "none",
              margin: 0,
            },
        }}
      />
      <Button onClick={() => setCounter(counter + 1)} variant="contained">
        +
      </Button>
    </ButtonGroup>
  );
}
