import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import { CssBaseline, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, mediaUrl } from "../constants";
import { useAlert } from 'react-alert'



export default function DialogComponent(props) {
  const [fileStatus, setFileStatus] = useState('')
  const [selectedVideo, setSelectedVideo] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const alert = useAlert();

   useEffect(() => {
    if (selectedVideo){
        setFileStatus('✓ Video added')
        }
      }, [selectedVideo]);



    const saveVideo = () =>{
        if (selectedVideo && title ){
           const formData = new FormData();
           formData.append('video', selectedVideo);
           formData.append('title', title);
           fetchWithAuth(baseUrl + "upload-video/", {
              method: "POST",
              headers: { 'Accept': "application/json, text/plain, */*" },
              body: formData,
           })
              .then((response) => {
                if (response.ok) {
                    alert.show("Video added successfully!")
                }
                else{
                   alert.show("Error... Try later.",{
                   type: 'error'}
                )
              }

              })
              .then((data) => {
                console.log(data);
              });
            props.open(false)
        }
        else{
            selectedVideo || setErrorMessage('Video title is required');
            fileStatus || setFileStatus('You have not selected any file');
        }
}


return(
<div>
    <DialogTitle variant='overline' sx = {{fontSize: "15px"}}>{"Upload your video"}</DialogTitle>

    <Container sx={{display:'flex', flexDirection:"column", alignItems:"center"}}>
        <input type = 'file' id="select-image" style={{ display: "none" }} onChange={e => setSelectedVideo(e.target.files[0])}/>
         <label htmlFor="select-image">
            <Button variant="contained" color="secondary" sx = {{ marginTop:'30px'}}component="span">
              Upload
            </Button>
          </label>
        <Typography sx = {{color: selectedVideo? "green" :"red", fontSize:"15px"}}> {fileStatus}</Typography>

        <TextField
        helperText={errorMessage}
        error={errorMessage}
        onChange={(e) => {setTitle(e.target.value);}}
        label="Title" variant="standard" required sx = {{width:'200px', margin:'20px'}} > Add your video here</TextField>
        <DialogActions sx = {{alignItems:"center"}}>
      <Button variant="contained" onClick={() => {props.open(false)}}>Cancel</Button>
      <Button variant="contained" onClick={saveVideo}>Save</Button>
    </DialogActions>
    </Container>
   </div>
)
}