import { fetchWithAuth } from "../api/fetchWithAuth";
import Header from "./Header";
import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { CssBaseline } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { baseUrl, mediaUrl } from "../constants";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

export const HomePage = () => {
  const [userData, setUserData] = useState({ user: "", photo: "" });
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [step, setStep] = useState(0);

  const getVideo = (link) => {
    fetchWithAuth(link, { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setVideoList([...videoList, ...data.results]);
          setNext(data.next);
          setPrevious(data.previous);
        }
      });
  };

  useEffect(() => {
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
    getVideo(baseUrl + "video/?offset=0");
  }, []);

  const nextVideo = async () => {
    if (step === videoList.length - 2 && next) {
      await getVideo(next);
    }
    setStep((step) => step + 1);
  };

  const previousVideo = () => {
    setStep((step) => step - 1);
  };

  const arrowClick = (event) => {
    if (event.code === "ArrowLeft" && step !== 0) {
      previousVideo();
    }
    if (
      event.code === "ArrowRight" &&
      !(step === videoList.length - 1 && !next)
    ) {
      nextVideo();
    }
  };

  const handlerRef = useRef(null);

  useEffect(() => {
    document.body.removeEventListener("keydown", handlerRef.current);
    document.body.addEventListener("keydown", arrowClick);
    handlerRef.current = arrowClick;
    return () => {
      document.body.removeEventListener("keydown", arrowClick);
    };
  }, [step, next]);

  return (
    <div>
      <CssBaseline />
      <Header user={{ photo: userData.photo, user: userData.user }} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          width: "100%",
          height: "calc(100vh - 70px)",
        }}
      >
        {videoList.length ? (
          <>
            <Button
              sx={{ visibility: step === 0 ? "hidden" : "" }}
              onClick={() => {
                previousVideo();
              }}
            >
              <ArrowBackIosOutlinedIcon />
            </Button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "100%",
                backgroundColor: "black",
              }}
            >
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: "10%",
                }}
              >
                {videoList[step].photo.photo ? (
                  <Avatar
                    src={mediaUrl + videoList[step].photo.photo}
                    sx={{ width: 40, height: 40, margin: "10px" }}
                  />
                ) : (
                  <Avatar sx={{ width: 40, height: 40, margin: "10px" }} />
                )}
                <Typography variant="subtitle2">
                  {videoList[step].owner}{" "}
                </Typography>
              </Container>

              <video
                width="80%"
                height="80%"
                style={{ display: "block" }}
                controls
                src={videoList[step]?.videofile}
              />

              <div style={{ backgroundColor: "black", marginLeft: "10px" }}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    paddingBottom: "5px",
                    marginRight: "600px",
                  }}
                >
                  {videoList[step]?.title}
                </Typography>
              </div>
            </div>
            <Button
              sx={{
                visibility:
                  step === videoList.length - 1 && !next ? "hidden" : "",
              }}
              onClick={() => {
                nextVideo();
              }}
            >
              <ArrowForwardIosOutlinedIcon />
            </Button>
          </>
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
