import React from 'react'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


const LandingPage = () => {
  document.body.style.backgroundColor = 'white';

  return (
    <Grid container style={{ minHeight: '80vh' }}>
      <Grid item xs={12}><Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>trackie</Typography></Grid>
      <Grid item xs={12} spacing={2} direction="row">
        <Stack spacing={2} direction="row">
          <Link to="/login/"><Button variant="contained">Log in</Button></Link>
          <Link to="/signup/"><Button variant="outlined">Sign up</Button></Link>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default LandingPage