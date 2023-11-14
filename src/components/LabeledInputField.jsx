import { TextField, Typography } from "@mui/material";

export default function LabeledInputfield({
  id,
  label,
  type = "text",
  onChange,
  value,
  startAdornment,
  endAdornment,
}) {
  return (
    <div>
      <Typography>{label}</Typography>
      <TextField
        id={id}
        type={type}
        fullWidth
        onChange={onChange}
        value={value}
        InputProps={{
            startAdornment,
            endAdornment,
        }}
      />
    </div>
  );
}
