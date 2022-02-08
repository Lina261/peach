import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl } from "../constants";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";

export const HomePage = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchWithAuth(baseUrl + "home/", { method: "GET", headers: {} })
      .then((response) => response.json())
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
      <div>hi!</div>
    </div>
  );
};
