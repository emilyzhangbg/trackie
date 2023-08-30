import React, { useContext } from 'react'
import Typography from '@mui/material/Typography';
import AuthContext from '../context/AuthContext';
import Button from '@mui/material/Button';

const HomePage = () => {
  document.body.style.backgroundColor = 'white';

  let {user, logOut} = useContext(AuthContext)

  return (
    <div>
      <Typography>Hi {user}, you are logged in!</Typography>
      <Button variant="contained" onClick={() => {logOut()}}>Log out</Button>
    </div>
  )
}

export default HomePage
