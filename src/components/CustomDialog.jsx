import { Box, Button, Typography, Modal, Grid } from "@mui/material";

export default function CustomDialog({ description, icon, open, onConfirm, onClose }) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: 410,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 2,
        }}
      >
        <Grid container gap={4}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              {icon && <Grid item xs={2}>
                <Box sx={{display: "flex", justifyContent: "center", alignItem: "center"}}>
                    {icon}
                </Box>
                </Grid>}
              <Grid item xs={10}>
                <Typography>{description}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" fullWidth onClick={onConfirm}>Ok</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" fullWidth onClick={onClose}>Cancel</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
