import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import * as React from "react";
import Header from "./Header";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, photoUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";

export const PeoplePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchWithAuth(baseUrl + "people/", { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setData(data);
        }
      });
    fetchWithAuth(baseUrl + "home/", { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setUserData(data);
        }
      });
  }, []);

  return (
    <div>
      <CssBaseline />
      <Header user={userData} />
      <SearchBar />
      <Container
        sx={{
          width: "45%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data.map((user) => (
          <Container
            sx={{
              width: "100%",
              margin: "20px",
              // backgroundColor: "#3C393B",
              backgroundColor: "#282527",
              border: "thick double #e7a2b4",
              borderRadius: "15px",
              display: "flex",
              flex: "50%",
            }}
          >
            {user.photo ? (
              <Avatar
                src={photoUrl + user.photo}
                alt="photo"
                sx={{ width: 150, height: 150, margin: "20px" }}
              />
            ) : (
              <Avatar
                // src="/broken-image.jpg"
                // src="/static/images/avatar/2.jpg"
                sx={{ width: 150, height: 150, margin: "20px" }}
              />
            )}
            {/*<Container*/}
            {/*  sx={{*/}
            {/*    margin: "15px",*/}
            {/*    display: "grid",*/}
            {/*    width: "100%",*/}
            {/*    backgroundColor: "#3C393B",*/}
            {/*    gridTemplateColumns: "50% 30%",*/}
            {/*    // display: "flex",*/}
            {/*    // flexDirection: "column",*/}
            {/*    // justifyContent: "space-between",*/}
            {/*  }}*/}
            {/*>*/}
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
                onClick={(e) => {
                  navigate("/home", { replace: true });
                }}
              >
                Subscribe
              </Button>
            </Container>
          </Container>
          // </Container>
        ))}
      </Container>
    </div>
  );
};
