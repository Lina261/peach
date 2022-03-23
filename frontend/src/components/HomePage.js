import { fetchWithAuth } from "../api/fetchWithAuth";
import Header from "./Header";
import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { CssBaseline } from "@mui/material";
import { baseUrl, mediaUrl } from "../constants";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { VideoItem } from "./VideoItem";

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
          console.log(data);
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

            <VideoItem
              video={videoList[step]}
              setList={setVideoList}
              containerBackground="black"
              indent="10%"
              autoplay={true}
            />

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
