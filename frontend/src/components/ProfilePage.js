import Container from "@mui/material/Container";
import { CardMedia, CssBaseline } from "@mui/material";
import * as React from "react";
import Header from "./Header";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, photoUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const ProfilePage = () => {
  const navigate = useNavigate();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchWithAuth(baseUrl + "profile/", { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
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
            src={photoUrl + userData.photo}
            alt="photo"
            sx={{ width: 250, height: 250, margin: "20px" }}
          />
        ) : (
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 56, height: 56 }}
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
          <Link href="#" underline="none">
            Followers
          </Link>
          <Link href="#" underline="none">
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
            width: "100%",
          }}
          maxWidth="md"
        >
          {userData.video.map((video) => (
            <video width="280" height="240" controls>
              <source src={photoUrl + video.videofile} type="video/mp4" />
            </video>
          ))}
        </Container>
      </Container>
    </div>
  );
};
