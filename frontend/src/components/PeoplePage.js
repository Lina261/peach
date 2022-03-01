import { CssBaseline } from "@mui/material";
import { PeopleList } from "./PeopleList";

export const PeoplePage = () => {
  return (
    <div>
      <CssBaseline />
      <PeopleList title="People" apiPoint="people/" subscribeStatus={false} />
    </div>
  );
};
