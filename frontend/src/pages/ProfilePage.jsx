import React, {useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext';
import BottomNavBar from '../components/BottomNavBar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const ProfilePage = () => {
  let {authTokens} = useContext(AuthContext)

  let getUserInfo = async () => {
    let response = await fetch('/users/returnUser/', {
      method: 'GET', 
      headers: {
        'Content-Type': 'applications/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }})
    let data = await response.json()
    console.log(data)
  }

  useEffect(() => {getUserInfo()}, [])

  return (
    <>
      <Stack width="200" direction="column" spacing={2}> 
        <Typography variant="h5">Profile</Typography>
        <TextField id="profile-email" label="Email" variant="outlined" />
        <TextField
            id="filled-multiline-static"
            label="Bio"
            multiline
            rows={4}
            defaultValue="bio"
            variant="outlined"
          />
        <TextField id="profile-age" label="Age" variant="outlined" />
      </Stack>

      <BottomNavBar />
    </>
  )
}

export default ProfilePage