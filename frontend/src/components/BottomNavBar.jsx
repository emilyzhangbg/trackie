import React, {useState, useEffect} from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router-dom'

const BottomNavBar = () => {
  const hashMap = {
    0: "/home/",
    1: "/posts/",
    2: "/profile/"
  }

  let currentUrl =  window.location.href

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (currentUrl.includes(hashMap[1])) {
      setValue(1);
    }
    else if (currentUrl.includes(hashMap[2])) {
      setValue(2);
    }
  }, [])

  const navigateTo = useNavigate()

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        navigateTo(hashMap[newValue])
      }}

      sx={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Posts" icon={<AddCircleOutlineIcon />} />
      <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  )
}

export default BottomNavBar
