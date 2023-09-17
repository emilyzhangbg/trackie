import React, {useEffect, useContext, useState} from 'react'
import AuthContext from '../context/AuthContext';
import BottomNavBar from '../components/BottomNavBar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar';

const ProfilePage = () => {
  document.body.style.backgroundColor = 'white';

  let {user, authTokens, logOut} = useContext(AuthContext)

  let [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    getUserInfo()
  }, [])

  let getUserInfo = async () => {
    let response = await fetch('/users/returnUser/', {
      method: 'GET', 
      headers: {
        'Content-Type': 'applications/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }})
    
    if (response.status === 200){
      let data = await response.json()
      setUserInfo(data)
      console.log(data)
    } else if (response.statusText === "Unauthorized"){
      logOut()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInfo({...userInfo, [name]: value})
  }

  const saveChanges = async () => {
    let response = await fetch("/users/updateProfile/", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: {
        'age': String(userInfo.age),
        'bio': String(userInfo.bio)
      }
    }) 
      
    
    if (response.status === 200) {
      alert('Your changes are saved!')
    } else {
      alert("Failed to save")
    }
  }

  const discardChanges = () => {
    getUserInfo()
  }
  return (
    <>
      <Button sx={{m: 2}} style={{float: "right"}} variant="contained" onClick={() => {logOut()}}>Log out</Button>
      <Grid container sx={{mb: 10}} direction="column" rowSpacing={3} justifyContent="center" alignItems="center" >
        <Stack direction="row" spacing={2} sx={{mb: 10}}> 
        <Grid item xs={12}>
          <Avatar sx={{ height: 100, width: 100, mb: 1 }} alt="Your avatar" src={userInfo.avatar} />
        </Grid>
        <Grid item xs={12} sx={{mb: 1 }}>
          <Stack direction="column" spacing={2}> 
            <Typography variant="h3">{user.username}</Typography>
            <TextField
              label="Age"
              id="user-age"
              defaultValue={userInfo.age}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        </Stack>
        <TextField
              id="user-bio"
              label="About Me"
              multiline
              rows={4}
              defaultValue={userInfo.bio}
              onChange={handleInputChange}
              variant="outlined"
            />
        <Grid item xs={12} spacing={2} direction="row">
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={saveChanges}>Save</Button>
            <Button variant="outlined" onClick={discardChanges}>Cancel</Button>
          </Stack>
        </Grid>
      </Grid>
      <BottomNavBar />
    </>
  )
}

export default ProfilePage