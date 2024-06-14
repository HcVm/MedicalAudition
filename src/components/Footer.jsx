import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'lightgray', p: 2, mt: 2 }}>
      <Typography variant="body2" color="textSecondary" align="center">
        © 2024 Medical Audicion - Grupo 5.
      </Typography>
    </Box>
  );
}

export default Footer;
