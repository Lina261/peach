import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl } from "../constants";
import { CssBaseline, TextField } from "@mui/material";
import Header from "./Header";
import UploadPhoto from "./UploadPhoto";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SettingsPage = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    fetchWithAuth(baseUrl + "user-info/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userData }),
    })
      .then((response) => {
        if (response.ok) {
          alert.show("Profile updated!!!");
          setTimeout(() => navigate("/profile", { replace: true }), 500);
        } else {
          alert.show("Something went wrong...", {
            timeout: 2000,
            type: "error",
          });
          setTimeout(() => navigate("/profile", { replace: true }), 500);
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    caption: "",
    account: { username: "", email: "", id: "" },
    photo: "",
    follows: "",
    followers: "",
  });

  useEffect(() => {
    fetchWithAuth(baseUrl + "user-info/", { method: "GET", headers: {} })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserData(data);
          console.log(data);
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
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
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
              src={"http://127.0.0.1:8000" + userData.photo}
              alt="photo"
              sx={{ width: 250, height: 250, margin: "20px" }}
            />
          ) : (
            <Avatar sx={{ width: 250, height: 250, margin: "20px" }} />
          )}
          <Button variant="text" component="label" onClick={handleClickOpen}>
            Change photo
          </Button>
        </Container>

        <Container sx={{ paddingTop: "50px" }}>
          <TextField
            label="Email"
            value={userData.account.email}
            sx={{ margin: "20px" }}
            disabled={true}
          />
          <TextField
            label="Name"
            value={userData.name}
            sx={{ margin: "20px" }}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

          <TextField
            label="Surname"
            value={userData.surname}
            sx={{ margin: "20px" }}
            onChange={(e) =>
              setUserData({ ...userData, surname: e.target.value })
            }
          />

          <TextField
            label="Caption"
            value={userData.caption}
            sx={{ margin: "20px" }}
            onChange={(e) =>
              setUserData({ ...userData, caption: e.target.value })
            }
          />
          <TextField
            label="Username"
            value={userData.account.username}
            sx={{ margin: "20px" }}
            onChange={(e) =>
              setUserData({
                ...userData,
                account: { ...userData.account, username: e.target.value },
              })
            }
          />
        </Container>
      </Container>
      <Container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button
          sx={{ margin: "20px" }}
          variant="outlined"
          onClick={(e) => {
            navigate("/home", { replace: true });
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{ margin: "20px" }}
          variant="outlined"
          onClick={updateProfile}
        >
          Save
        </Button>
        <Dialog
          PaperProps={{
            sx: {
              width: "20%",
              height: "230px",
              maxHeight: "230px",
              textAlign: "center",
            },
          }}
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
        >
          <UploadPhoto open={setOpen} />
        </Dialog>
      </Container>
    </div>
  );
};
