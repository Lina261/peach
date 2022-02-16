import { CssBaseline } from "@mui/material";
import {PeopleItem} from "./PeopleItem";
import {PeopleList} from "./PeopleList";

export const Follows = () => {

  return (
    <div>
      <CssBaseline />
      <PeopleList title="Follows" apiPoint = 'follows/' subscribeStatus={true}  />
    </div>
  );
};
