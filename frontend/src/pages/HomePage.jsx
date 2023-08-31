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
import CreatePost from '../components/CreatePost';

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
    <>
      <Button sx={{m: 2}} style={{float: "right"}} variant="contained" onClick={() => {logOut()}}>Log out</Button>
      <Grid container sx={{pb: 5}} direction="column" rowSpacing={3} justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          <Typography variant="h5">Hi {user}!</Typography>
        </Grid>

        <Grid item xs={12}>
        <CreatePost onMakePost={getPosts}/>
        </Grid>

        {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <Paper sx={{minWidth: 300, width: '40%', p:2}} elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                {post.image? <CardMedia
                  sx={{ height: 200, mb: 1 }}
                  component="img"
                  image={post.image}
                  alt={post.caption}
                /> : null}
              </Grid>
              <Grid item xs={10} style={{ alignItems: 'center'}} key={String(post.id) + "caption"}>
                <Typography variant="body1">{post.caption}</Typography>
              </Grid>
              <Grid item xs={2} style={{textAlign: 'right', display: 'flex', alignItems: 'center'}} key={String(post.id) + "heart"}>
              <IconButton><FavoriteBorderIcon/></IconButton>
                <Typography>{post.likes}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">{post.created_at.split('T')[0]}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>))}
      
      </Grid>
      <BottomNavBar sx={{ position: 'fixed', bottom: 0 }} />
    </>
  )
}

export default HomePage
