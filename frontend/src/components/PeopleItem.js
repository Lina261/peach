import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, photoUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";


export const PeopleItem = (props) => {
    const user = props.user
    const [subscribed, setSubscribed] = useState(props.subscribeStatus ? props.subscribeStatus : user.subscribe_status)
    const onSubscribe = (user) =>{
    console.log(user)
    console.log(user.subscribe_status)
    if (!subscribed){
        fetchWithAuth(baseUrl + "subscribe/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 'to_subscribe':user }),
        })
          .then((response) => {
            if (response.ok) {
                setSubscribed(true)
              console.log(response.json());

            }
          })}
    else{
        fetchWithAuth(baseUrl + "unsubscribe/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 'unsubscribe':user }),
        })
          .then((response) => {
            if (response.ok) {
                setSubscribed(false)
              console.log(response.json());

            }
          })
    }
  }

return (
<Container

            sx={{
              width: "100%",
              margin: "20px",
              backgroundColor: "#282527",
              border: "thick double #e7a2b4",
              borderRadius: "15px",
              display: "flex",
              flex: "50%",
            }}
          >
          <CssBaseline />
            {user.photo ? (
              <Avatar
                src={photoUrl + user.photo}
                alt="photo"
                sx={{ width: 150, height: 150, margin: "20px" }}
              />
            ) : (
              <Avatar
                sx={{ width: 150, height: 150, margin: "20px" }}
              />
            )}

            <Container
              sx={{
                marginTop: "15px",
              }}
            >
              <Typography variant="h5" sx={{}}>
                {user.account.username}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontStyle: "oblique",
                }}
              >
                {user.caption}
              </Typography>
            </Container>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx = {{backgroundColor: subscribed ? "black": undefined  }}
                onClick={() =>onSubscribe(user.account.username)}
              >
                {subscribed ? "Unsubscribe" : "Subscribe"}
              </Button>
            </Container>
          </Container>
 )}