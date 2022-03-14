import { CssBaseline } from "@mui/material";
import { PeopleList } from "./PeopleList";
import { useParams } from "react-router-dom";

export const UserFollows = () => {
  const { id } = useParams();
  return (
    <div>
      <CssBaseline />
      <PeopleList title="Follows" apiPoint={id + "/follows/"} />
    </div>
  );
};
