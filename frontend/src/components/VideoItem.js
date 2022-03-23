import { fetchWithAuth } from "../api/fetchWithAuth";
import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { baseUrl, mediaUrl } from "../constants";

export const VideoItem = (props) => {
  const video = props.video;

  const changeLikeStatus = () => {
    fetchWithAuth(baseUrl + "set-like/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like_status: !video.liked, id: video.id }),
    }).then((response) => {
      if (response.ok) {
        props.setList((list) => {
          return list.map((item) => {
            return {
              ...item,
              liked: item.id === video.id ? !item.liked : item.liked,
            };
          });
        });
        console.log(response.json());
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100%",
        backgroundColor: props.containerBackground,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: props.indent,
        }}
      >
        {video.photo.photo ? (
          <Avatar
            src={mediaUrl + video.photo.photo}
            sx={{ width: 40, height: 40, margin: "7px" }}
          />
        ) : (
          <Avatar sx={{ width: 40, height: 40, margin: "7px" }} />
        )}
        <Typography variant="subtitle2">{video.owner} </Typography>
      </Container>

      <video
        width="80%"
        height="80%"
        style={{ display: "block" }}
        controls
        autoPlay={props.autoplay}
        src={
          video.videofile.includes(mediaUrl)
            ? video.videofile
            : mediaUrl + video.videofile
        }
      />

      <div
        style={{
          backgroundColor: "black",
          paddingLeft: "15px",
          width: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "space-between",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontStyle: "italic",
            paddingBottom: "5px",
          }}
        >
          {video?.title}
        </Typography>
        <Button onClick={() => changeLikeStatus()}>
          {video.liked ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </Button>
      </div>
    </div>
  );
};
