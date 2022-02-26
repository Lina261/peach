import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import * as React from "react";
import Header from "./Header";
import { useNavigate} from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import {PeopleItem} from "./PeopleItem";
import SentimentDissatisfiedSharpIcon from '@mui/icons-material/SentimentDissatisfiedSharp';


export const PeopleList = (props) => {
  const [userData, setUserData] = useState("");
  const [data, setData] = useState([]);
  const apiPoint = props.apiPoint
  const subscribeStatus = props.subscribeStatus


  const findAccount=(account) => {
    fetchWithAuth(baseUrl + "find-account/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({'account':account}),
    })
      .then((response) => {
        if (response.ok) {
            return response.json()

        .then((data) => {
            if (data) {
              setData(data);
            }
      });}
         else{
            setData('')
            console.log(response.status)
        }
        })


}

  useEffect(() => {
    fetchWithAuth(baseUrl + apiPoint, { method: "GET", headers: {} })
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
      <Header user={userData}  />
      <SearchBar title = {props.title} findAccount = {findAccount} />
      <Container
        sx={{
          width: "45%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
        key={data.length}
      >
      {data?
        data.map((user) => (
          <PeopleItem user={user} key={user.account.id} subscribeStatus={subscribeStatus} />
        )) :
        <Container sx={{margin:"150px", display:"flex", flexDirection:"row", alignItems:"center", justifyContent: "center"}}>
        <SentimentDissatisfiedSharpIcon  sx={{fontSize:"80px"}}/>
        <Typography  sx={{margin:"20px", fontSize:"20px"}} >Nothing was found</Typography>
        </Container>}
      </Container>
    </div>
  );
};
