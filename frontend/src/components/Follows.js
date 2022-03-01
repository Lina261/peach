import { CssBaseline } from "@mui/material";
import { PeopleList } from "./PeopleList";

export const Follows = () => {
  return (
    <div>
      <CssBaseline />
      <PeopleList title="Follows" apiPoint="follows/" subscribeStatus={true} />
    </div>
  );
};
