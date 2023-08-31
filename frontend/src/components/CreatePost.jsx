import React, {useContext, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AuthContext from '../context/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

export default function CreatePost({onMakePost}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {authTokens} = useContext(AuthContext);
  let [imageUrl, setImageUrl] = useState(null);
  let [imageObject, setImageObject] = useState(null)
  let [caption, setCaption] = useState(null)
  let [hashtags, setHashtags] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImageObject(file)

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const deleteImage = () => {
    setImageUrl(null)
    setImageObject(null)
  }

  const post = async () => {
    if (caption || imageObject) {
      let formData = new FormData();
      formData.append("caption", caption)
      formData.append("hashtags", hashtags)
      if (imageObject) {
        console.log("image appended")
        formData.append("image", imageObject)
      }

      console.log(formData['image'])
      let response = await fetch("/posts/", {
        method:'POST',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: formData
      })

      if (response.status === 200) {
        onMakePost()
      } else {
        alert("Failed to post")
      }

      deleteImage()
      handleClose()
      setCaption(null)
      setHashtags(null)
    }
  }

  return (
    <div>
      <IconButton onClick={handleOpen}><AddCircleOutlineIcon sx={{ fontSize: '40px' }}/></IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container direction="column" spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <TextField sx={{ width: '100%'}} id="post-caption" label="Caption" variant="standard" onChange={(e) => {
                setCaption(e.target.value)
              }}    />
              </Grid>
              <Grid item xs={12}>
                <TextField sx={{ width: '100%'}} id="post-hashtags" label="#hashtags" variant="standard" onChange={(e) => {
                setHashtags(e.target.value)
              }}    />
              </Grid>
              <Grid item xs={12}>
                <IconButton id="post-image" variant="contained" component="label">
                  <AddPhotoAlternateIcon sx={{fontSize: '40px', color: "primary.main"}} />
                  <input hidden accept="image/*" type="file" onChange={handleFileUpload}/>
                </IconButton>

                {imageUrl? (<Button sx={{ml: 2}} id="delete-image" variant="outlined" onClick={deleteImage}>Delete image</Button>):null}
              </Grid>
              
              {imageUrl?(<Grid item xs={12}><img src={imageUrl} alt="Uploaded Image" height="300px" /></Grid>) : null}
              <Grid item xs={12}>
                <Button id="post-post" variant="contained" component="label" onClick={post}>Post</Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}