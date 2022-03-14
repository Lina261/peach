import { CssBaseline } from "@mui/material";
import { PeopleList } from "./PeopleList";
import { useParams } from "react-router-dom";

export const UserFollowers = () => {
  const { id } = useParams();
  return (
    <div>
      <CssBaseline />
      <PeopleList title="Followers" apiPoint={id + "/followers/"} />
    </div>
  );
};
