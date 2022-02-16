import { fetchWithAuth } from "../api/fetchWithAuth";
import Header from "./Header";
import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { CardMedia, CssBaseline } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { baseUrl, mediaUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

export const HomePage = () => {
  const navigate = useNavigate();
  const subscribeStatus = true
  const [userData, setUserData] = useState( {user:"",  photo: ""});
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
     fetchWithAuth(baseUrl + "home/", { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
        console.log(data)
          setUserData(data);
        }
      });


  fetchWithAuth(baseUrl + "video/", { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
        console.log("VIDEO HOME",data)
          setVideoList(data);
        }
      });
  }, []);

  const [step, setStep] = useState(0);

  return (
    <div>
      <CssBaseline />
      <Header
        user={{ photo: userData.photo, user: userData.user }}
      />
      <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
            height: "calc(100vh - 70px)",

          }}
        >
        <Button>
            <ArrowBackIosOutlinedIcon />
        </Button>
        {videoList.length ? (
          [videoList[step]].map((video) => (

            <div key={video.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'black'
                }}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Avatar
                        sx={{ width: 40, height: 40, margin: "10px", marginLeft: "10%" }}
                    />
                    <Typography variant="subtitle2">Ivan </Typography>
                </Container>
                <video width="80%" style={{display: 'block'}} controls>
                  <source src={video.videofile} type="video/mp4" />
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
          <Button onClick={() => setStep((p) => p + 1)}>
            <ArrowForwardIosOutlinedIcon />
          </Button>
        </Container>


    </div>
  )
};




