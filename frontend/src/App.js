import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { SettingsPage } from "./components/SettingsPage";
import { ProfilePage } from "./components/ProfilePage";
import SignIn from "./components/Sign-in";
import SignUp from "./components/Sign-up";
import LogoutDialog from "./components/LogoutDialog";
import { PeoplePage } from "./components/PeoplePage";
import { Follows } from "./components/Follows";
import { Followers } from "./components/Followers";
import { DetailProfile } from "./components/DetailProfile";
import { UserFollows } from "./components/UserFollows";
import { UserFollowers } from "./components/UserFollowers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/sign-up"} element={<SignUp />} />

        <Route path={"/"} element={<SignIn />} />

        <Route path={"/home"} element={<HomePage />} />

        <Route path={"/settings"} element={<SettingsPage />} />

        <Route path={"/profile"} element={<ProfilePage />} />

        <Route path={"/profile/:id"} element={<DetailProfile />} />

        <Route path={"/people"} element={<PeoplePage />} />

        <Route path={"profile/follows"} element={<Follows />} />

        <Route path={"profile/followers"} element={<Followers />} />

        <Route path={"profile/:id/follows"} element={<UserFollows />} />

        <Route path={"profile/:id/followers"} element={<UserFollowers />} />
      </Routes>
    </div>
  );
}

export default App;
