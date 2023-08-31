import React, { useContext, useEffect, useState } from 'react'
import BottomNavBar from '../components/BottomNavBar';
import Typography from '@mui/material/Typography';
import AuthContext from '../context/AuthContext';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardMedia from '@mui/material/CardMedia';

const HomePage = () => {
  document.body.style.backgroundColor = 'white';

  let {user, logOut, authTokens} = useContext(AuthContext)

  let [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
  }, [])

  let getPosts = async () => {
    let response = await fetch("/posts/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })

    if (response.status === 200) {
      let data = await response.json()
      setPosts(data)
    }
    else if (response.statusText === "Unauthorized") {
      logOut()
    }
  }

  console.log(posts)

  return (
    <div>
      <Button sx={{m: 2}} style={{float: "right"}} variant="contained" onClick={() => {logOut()}}>Log out</Button>
      <Grid container sx={{pb: 5}} direction="column" rowSpacing={3} justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          <Typography variant="h5">Hi {user}!</Typography>
        </Grid>

        <Grid item xs={12}>
        <IconButton sx={{m:1}} size="large"><AddCircleOutlineIcon sx={{ fontSize: "40px" }}/></IconButton>
        </Grid>

        {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <Paper sx={{minWidth: 300, width: '40%', p:2}} elevation={3}>
            <Grid container>
              <Grid item xs={12}>
              <CardMedia
                sx={{ height: 200, mb: 1 }}
                component="img"
                image={post.image}
                alt={post.caption}
              />
              </Grid>
              <Grid item xs={10} style={{ alignItems: 'center'}} key={String(post.id) + "caption"}>
              <Typography>{post.caption}</Typography>
              </Grid>
              <Grid item xs={2} style={{textAlign: 'right', display: 'flex', alignItems: 'center'}} key={String(post.id) + "heart"}>
              <IconButton><FavoriteBorderIcon/></IconButton>
              <Typography>{post.likes}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>))}
      
      </Grid>
      <BottomNavBar/>
    </div>
  )
}

export default HomePage
