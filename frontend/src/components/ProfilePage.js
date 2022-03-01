import { CssBaseline } from "@mui/material";
import * as React from "react";
import { DetailProfile } from "./DetailProfile";

export const ProfilePage = () => {
  return (
    <div>
      <CssBaseline />
      <DetailProfile currentUser={true} />
    </div>
  );
};
