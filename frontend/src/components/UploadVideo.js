import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, mediaUrl } from "../constants";
import DialogComponent from "./DialogComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadVideo(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
        <Fab onClick = {handleClickOpen}  sx={{ position:"fixed", right: "40px", bottom: "40px"}} color="secondary" aria-label="add">
            <AddIcon />
         </Fab>

        <Dialog
            PaperProps={{ sx: { width: "20%", height: "280px" , textAlign: "center"} }}
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
        >

        <DialogComponent open = {setOpen} />

      </Dialog>

    </div>
  );
}
