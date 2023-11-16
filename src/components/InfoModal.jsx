import { Box, Button, Typography, Modal, Grid } from "@mui/material";

export default function InfoModal({ title, info={}, open, onClose }) {
  console.log('info: ', info)
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: 350,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          {
            Object.entries(info).map(([key, value], i) => (
              <Grid key={i} item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{textTransform: "capitalize"}}>{key}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {value}
                  </Grid> 
                </Grid>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Modal>
  );
}
