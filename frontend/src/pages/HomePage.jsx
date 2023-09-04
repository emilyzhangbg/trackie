import React, { useContext, useEffect, useState } from 'react'
import BottomNavBar from '../components/BottomNavBar';
import Typography from '@mui/material/Typography';
import AuthContext from '../context/AuthContext';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import CardMedia from '@mui/material/CardMedia';
import CreatePost from '../components/CreatePost';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip'
import FavoriteIcon from '@mui/icons-material/Favorite';

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

  let deletePost = async (e) => {
    let id = e.currentTarget.id.split("-")[0]
    
    let response = await fetch("/posts/" + id + "/", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }})

    if (response.status === 200) {
      getPosts()
    } else {
      alert("Failed to delete")
    }
  }

  let likePost = async (e) => {
    let liked = e.currentTarget.className.includes("filled-heart")
    console.log(e.currentTarget.className)

    let id = e.currentTarget.id.split("-")[0]
    let method = 'PUT'

    if (liked) {
      method = 'DELETE'
    }

    let response = await fetch("/posts/likes/" + id + "/", {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }})

    if (response.status === 200) {
      let data = await response.json()
      console.log(data)
      getPosts()
    }
  }

  console.log(posts)

  return (
    <>
      <Button sx={{m: 2}} style={{float: "right"}} variant="contained" onClick={() => {logOut()}}>Log out</Button>
      <Grid container sx={{mb: 10}} direction="column" rowSpacing={3} justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          <Typography variant="h5">Hi {user.username}!</Typography>
        </Grid>

        <Grid item xs={12}>
        <CreatePost getPosts={getPosts}/>
        </Grid>
        
        {posts.map((post) => (
          <Paper key={post.id} sx={{minWidth: 300, width: '25%', m:2, p:2}} elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                {post.image? <CardMedia
                  sx={{ height: 300, mb: 1 }}
                  component="img"
                  image={post.image}
                  alt={post.caption}
                /> : null}
              </Grid>
              <Grid item xs={10} style={{ alignItems: 'center'}}>
                <Typography variant="body1">{post.caption}</Typography>
              </Grid>
              <Grid item xs={2} style={{textAlign: 'right', display: 'flex', alignItems: 'center'}} >
                {console.log(post.liked_users)}{console.log(user.user_id)}

                <IconButton id={String(post.id) + "-like"} className={(post.liked_users.includes(user.user_id))? "filled-heart" : ""} onClick={likePost}>{(post.liked_users.includes(user.user_id))? <FavoriteIcon sx={{color: 'red'}} /> :<FavoriteBorderIcon/>}</IconButton>
                <Typography>{post.likes}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">{post.created_at.split('T')[0]}</Typography>
              </Grid>
              <Grid item xs={11}>
                {post.hashtags.split("/").map((hashtag) => (hashtag!=="null")? <Chip key={hashtag} label={hashtag} sx={{my:1, mr:1}}/> : <></>)}
              </Grid>
              <Grid item xs={1} style={{alignContent: 'right'}}>
               <IconButton id={String(post.id) + "-delete"} onClick={deletePost}><DeleteIcon/></IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
      

      <BottomNavBar />
    </>
  )
}

export default HomePage
