import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


const LandingPage = () => {
  return (
    <Grid container direction="column" rowSpacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12}><Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>graphie</Typography></Grid>
      <Grid item xs={12} spacing={2} direction="row">
        <Stack spacing={2} direction="row">
          <Button variant="contained">Log in</Button>
          <Button variant="outlined">Continue as guest</Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default LandingPage