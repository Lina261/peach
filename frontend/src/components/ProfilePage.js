import Container from "@mui/material/Container";
import { CardMedia, CssBaseline } from "@mui/material";
import * as React from "react";
import Header from "./Header";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl, mediaUrl } from "../constants";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Player } from 'video-react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { DetailProfile } from "./DetailProfile";


export const ProfilePage = () => {

  return (
    <div>
      <CssBaseline />
      <DetailProfile currentUser={true} />
    </div>
  );
};
