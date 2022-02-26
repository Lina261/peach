import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl } from "../constants";
import { useAlert } from 'react-alert'
import SaveAltIcon from '@mui/icons-material/SaveAlt';


export default function UploadPhotoComponent(props) {
  const [fileStatus, setFileStatus] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState();
  const alert = useAlert();

  useEffect(() => {
    if (selectedPhoto){
        setFileStatus('✓ Photo added')
        }
      }, [selectedPhoto]);



    const savePhoto = () =>{
        if (selectedPhoto){
           const formData = new FormData();
           formData.append('photo', selectedPhoto);
           fetchWithAuth(baseUrl + "upload-photo/", {
              method: "POST",
              headers: { 'Accept': "application/json, text/plain, */*" },
              body: formData,
           })
              .then((response) => {
                if (response.ok) {
                    alert.show("Photo added successfully!")
                    window.location.reload(false);

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
            fileStatus || setFileStatus('You have not selected any file');
        }
}


return(
<div>
    <DialogTitle variant='overline' sx = {{fontSize: "15px", marginBottom:"10px"}}>{"Upload photo"}</DialogTitle>

    <Container sx={{display:'flex', flexDirection:"column", alignItems:"center"}}>
            <input  type = 'file' id="select-image" style={{ display: "none" }} onChange={e => setSelectedPhoto(e.target.files[0])}/>

         <label htmlFor="select-image">
            <Button variant="contained" color="secondary" component="span">
             <SaveAltIcon sx={{fontSize:"30px"}}/>
             Upload
            </Button>
          </label>
          <Container sx={{height:"20px", maxHeight:"20px"}}>
                    <Typography sx = {{color: selectedPhoto? "green" :"red", fontSize:"15px"}}> {fileStatus}</Typography>
          </Container>

        <DialogActions sx = {{alignItems:"center", marginTop:"20px"}}>
      <Button variant="outlined"  onClick={() => {props.open(false)}}>Cancel</Button>
      <Button variant="outlined"  onClick={savePhoto}>Save</Button>
    </DialogActions>
    </Container>
   </div>
)
}