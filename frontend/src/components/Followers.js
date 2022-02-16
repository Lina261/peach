import { CssBaseline } from "@mui/material";
import {PeopleItem} from "./PeopleItem";
import {PeopleList} from "./PeopleList";

export const Followers = () => {

  return (
    <div>
      <CssBaseline />
      <PeopleList title="Followers" apiPoint = 'followers/' />
    </div>
  );
};