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

export const Favorites = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState({
    video: [],
  });
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
          setData(data);
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
        {data.length ? (
          data.map((video) => (
            <div style={{ backgroundColor: "black" }}>
              <video width="280" style={{ marginBottom: 0 }} controls>
                <source src={mediaUrl + video.videofile} type="video/mp4" />
              </video>
              <div style={{ backgroundColor: "black", marginLeft: "10px" }}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    paddingBottom: "5px",
                  }}
                >
                  {video.title}
                </Typography>
              </div>
            </div>
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
