import { baseUrl, mediaUrl } from "../constants";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import Header from "./Header";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { VideoItem } from "./VideoItem";

export const Favorites = () => {
  const [header, setHeader] = useState("");

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
          setHeader(data);
        }
      });

    fetchWithAuth(baseUrl + "favorites/", {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setVideoList(data);
        }
      });
  }, []);

  return (
    <div>
      <CssBaseline />
      <Header user={header} />
      <Box>
        <AppBar
          sx={{ flexGrow: 2, backgroundColor: "#5b3e5b" }}
          position="static"
        >
          <Toolbar>
            <Typography
              variant="overline"
              sx={{ marginLeft: "30px", fontSize: "20px" }}
            >
              💗 Favorites 💗
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        sx={{
          paddingTop: "20px",
          justifyContent: "center",
          justifyItems: "center",
          display: "grid",
          gridTemplateColumns: "400px 400px 400px",
          gridGap: "20px 0",
          width: "100%",
          height: "100%",
          paddingBottom: "20px",
        }}
      >
        {videoList.length ? (
          videoList.map((video) => (
            <VideoItem
              key={video.name}
              video={video}
              setList={setVideoList}
              indent="5%"
              autoplay={false}
            />
          ))
        ) : (
          <Container
            sx={{
              gridColumnStart: "2",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <Typography variant="overline" sx={{ fontSize: "15px" }}>
              No video yet{" "}
            </Typography>
          </Container>
        )}
      </Container>
    </div>
  );
};
