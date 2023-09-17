import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const SignUpPage = () => {
  document.body.style.backgroundColor = '#2196f3';

  let {signUp} = useContext(AuthContext)

  let [username, setUsername] = useState(null)
  let [password, setPassword] = useState(null)
  let [firstname, setFirstname] = useState(null)
  let [lastname, setLastname] = useState(null)
  let [email, setEmail] = useState(null)
  let [bio, setBio] = useState(null)
  let [age, setAge] = useState(null)


  let userInfo = {
    username:username,
    password:password,
    first_name:firstname,
    last_name:lastname,
    email:email,
    bio:bio,
    age:age
  }
  
  return (
    <>
    <Link to="/"><Button sx={{ m:1, color: 'white' }} variant="text">Back</Button></Link>
    <Grid container style={{ minHeight: '92vh' }} justifyContent="center" alignItems="center">
      <Card sx={{ minWidth: 300, p: 2 }}>
        <CardContent>
          <Grid content>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: 24, fontWeight: 'bold', my: 2 }} color="text.primary" gutterBottom>
                Sign Up
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%', mt: 2 }}
                id="standard-firstname-input"
                label="First name"
                type="firstname"
                autoComplete="current-firstname"
                variant="standard"
                onChange={(e) => {
                  setFirstname(e.target.value)
                }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
              sx={{ width: '100%', mt: 2 }}
              id="standard-lastname-input"
              label="Last name"
              type="lastname"
              autoComplete="current-lastname"
              variant="standard"
              onChange={(e) => {
                setLastname(e.target.value)
              }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
              sx={{ width: '100%', mt: 2 }}
              id="standard-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value)
              }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                  sx={{ width: '100%', mt: 2 }}
                  id="standard-username-input"
                  label="Username"
                  type="username"
                  autoComplete="current-username"
                  variant="standard"
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}/>
            </Grid>
            <pre/>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%', mb: 2 }}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%', mb: 2 }}
                id="standard-bio-input"
                label="Bio"
                type="bio"
                autoComplete="current-bio"
                variant="standard"
                onChange={(e) => {
                  setBio(e.target.value)
                }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%', mb: 2 }}
                id="standard-age-input"
                label="Age"
                type="age"
                autoComplete="current-age"
                variant="standard"
                onChange={(e) => {
                  setAge(e.target.value)
                }}/>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button sx={{ width: '100%', my: 2 }} size="medium" variant="contained" onClick={()=>signUp(userInfo)}>Register</Button>
        </CardActions>
        </Card>
    </Grid>
    </>
  )
}

export default SignUpPage
