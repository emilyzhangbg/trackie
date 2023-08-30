import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import AuthContext from '../context/AuthContext';
//test again

const LogInPage = () => {
  document.body.style.backgroundColor = '#2196f3';
  
  let { logIn } = useContext(AuthContext)

  let [username, setUsername] = useState(null)
  let [password, setPassword] = useState(null)

  return (
    <>
    <Link to="/"><Button sx={{ m:1, color: 'white' }} variant="text">Back</Button></Link>
    <Grid container style={{ minHeight: '92vh' }} justifyContent="center" alignItems="center">
      <Card sx={{ minWidth: 275, p: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', my: 2 }} color="text.primary" gutterBottom>
            Log In
          </Typography>
          <TextField
              sx={{ width: '100%', mt: 2 }}
              id="standard-username-input"
              label="Username"
              type="username"
              autoComplete="current-username"
              variant="standard"
              onChange={(e) => {
                setUsername(e.target.value)
              }}            />
          <pre />
          <TextField
            sx={{ width: '100%', mb: 2 }}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </CardContent>
        <CardActions>
          <Button sx={{ width: '100%', my: 2 }} size="medium" variant="contained" onClick={() => {logIn(username, password)}}>Submit</Button>
        </CardActions>
        </Card>
    </Grid>
    </>
  )
}

export default LogInPage
