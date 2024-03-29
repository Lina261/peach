import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl } from "../constants";
import { useAlert } from "react-alert";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function DialogComponent(props) {
  const [fileStatus, setFileStatus] = useState("");
  const [selectedVideo, setSelectedVideo] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const alert = useAlert();

  useEffect(() => {
    if (selectedVideo) {
      setFileStatus("✓ Video added");
    }
  }, [selectedVideo]);

  const saveVideo = () => {
    if (selectedVideo && title) {
      const formData = new FormData();
      formData.append("video", selectedVideo);
      formData.append("title", title);
      fetchWithAuth(baseUrl + "upload-video/", {
        method: "POST",
        headers: { Accept: "application/json, text/plain, */*" },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert.show("Video added successfully!");
            setTimeout(() => window.location.reload(false), 2000);
          } else {
            alert.show("Error... Try later.", {
              type: "error",
            });
          }
        })
        .then((data) => {
          console.log(data);
        });
      props.open(false);
    } else {
      title || setErrorMessage("Video title is required");
      fileStatus || setFileStatus("You have not selected any file");
    }
  };

  return (
    <div>
      <DialogTitle variant="overline" sx={{ fontSize: "15px" }}>
        {"Upload your video"}
      </DialogTitle>

      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <input
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={(e) => setSelectedVideo(e.target.files[0])}
        />

        <label htmlFor="select-image">
          <Button variant="contained" color="secondary" component="span">
            <SaveAltIcon sx={{ fontSize: "30px" }} />
            Upload
          </Button>
        </label>
        <Container sx={{ height: "20px", maxHeight: "20px" }}>
          <Typography
            sx={{ color: selectedVideo ? "green" : "red", fontSize: "15px" }}
          >
            {" "}
            {fileStatus}
          </Typography>
        </Container>
        <TextField
          helperText={errorMessage}
          error={errorMessage}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label="Title"
          variant="standard"
          required
          sx={{ width: "200px", margin: "5px" }}
        />
        <DialogActions sx={{ alignItems: "center", marginTop: "20px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              props.open(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="outlined" onClick={saveVideo}>
            Save
          </Button>
        </DialogActions>
      </Container>
    </div>
  );
}
