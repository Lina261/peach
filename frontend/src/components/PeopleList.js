import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import * as React from "react";
import Header from "./Header";
import { useNavigate, useParams} from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, photoUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";
import {PeopleItem} from "./PeopleItem";

export const PeopleList = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [data, setData] = useState([]);
  const apiPoint = props.apiPoint
  const subscribeStatus = props.subscribeStatus

  useEffect(() => {
    fetchWithAuth(baseUrl + apiPoint, { method: "GET", headers: {} })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
        console.log(data)
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
      <SearchBar title = {props.title} />
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
          <PeopleItem user={user} subscribeStatus={subscribeStatus} />
        ))}
      </Container>
    </div>
  );
};
