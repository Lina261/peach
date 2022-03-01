import { CssBaseline } from "@mui/material";
import { PeopleList } from "./PeopleList";

export const Followers = () => {
  return (
    <div>
      <CssBaseline />
      <PeopleList title="Followers" apiPoint="followers/" />
    </div>
  );
};
