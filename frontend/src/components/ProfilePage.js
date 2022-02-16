import Container from "@mui/material/Container";
import { CardMedia, CssBaseline } from "@mui/material";
import * as React from "react";
import Header from "./Header";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, mediaUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Player } from 'video-react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export const ProfilePage = () => {
  const navigate = useNavigate();
  const subscribeStatus = true
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    caption: "",
    account: { username: "", email: "", id: "" },
    photo: "",
    follows: "",
    followers: "",
    video: [],
  });

  useEffect(() => {
    fetchWithAuth(baseUrl + "profile/", { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log("VIDEO",data.video);
          setUserData(data);
        }
      });
  }, []);

  return (
    <div>
      <CssBaseline />
      <Header
        user={{ photo: userData.photo, user: userData.account.username }}
      />
      <Container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {userData.photo ? (
          <Avatar
            src={mediaUrl + userData.photo}
            alt="photo"
            sx={{ width: 250, height: 250, margin: "20px" }}
          />
        ) : (
          <Avatar
            src="/static/images/avatar/2.jpg"
            sx={{ width: 250, height: 250, margin: "20px" }}
          />
        )}
        <Typography>
          {userData.name} {userData.surname}
        </Typography>
        <Typography sx={{ fontStyle: "italic", color: "white" }}>
          {userData.caption}
        </Typography>
        <Container
          maxWidth="md"
          sx={{
            marginTop: "20px",
            justifyContent: "center",
            justifyItems: "center",
            display: "grid",
            width: "100%",
            backgroundColor: "#3C393B",
            gridTemplateColumns: "100px 100px",
          }}
        >
          <Link href="/followers"
             underline="none">
            Followers
          </Link>
          <Link href="/follows" underline="none">
            Follows
          </Link>
          <Typography>{userData.followers}</Typography>
          <Typography>{userData.follows}</Typography>
        </Container>
        <Container
          sx={{
            marginTop: "20px",
            justifyContent: "center",
            justifyItems: "center",
            display: "grid",
            gridTemplateColumns: "300px 300px 300px",
            gridGap: "20px 0",
            width: "100%",
          }}
          maxWidth="md"
        >
        {userData.video.length ? (
          userData.video.map((video) => (
            <div style={{backgroundColor: 'black'}}>
                <video width="280" style={{marginBottom: 0}} controls>
                  <source src={mediaUrl + video.videofile} type="video/mp4" />
                </video>
                <div style={{backgroundColor: 'black', marginLeft: "10px"}}>
                    <Typography sx={{color:"white", fontWeight:"bold", fontStyle: "italic", paddingBottom: "5px"}}>{video.title}</Typography>
                </div>
            </div>
          ))) :
          <Container sx={{gridColumnStart: "2", textAlign:"center", marginTop:"30px"}}>
            <Typography variant="overline" sx={{ fontSize:"15px"}}>No video yet </Typography>
          </Container>
          }

        </Container>

      </Container>
       <Fab  sx={{ position:"fixed", right: "40px", bottom: "40px"}} color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
    </div>
  );
};
