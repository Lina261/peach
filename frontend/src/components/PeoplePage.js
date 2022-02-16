import { CssBaseline } from "@mui/material";
import {PeopleItem} from "./PeopleItem";
import {PeopleList} from "./PeopleList";

export const PeoplePage = () => {

  return (
    <div>
      <CssBaseline />
      <PeopleList title="People" apiPoint = 'people/' subscribeStatus={false}  />
    </div>
  );
};
