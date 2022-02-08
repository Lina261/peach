import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { SettingsPage } from "./components/SettingsPage";
import { ProfilePage } from "./components/ProfilePage";
import SignIn from "./components/Sign-in";
import SignUp from "./components/Sign-up";
import LogoutDialog from "./components/LogoutDialog";
import { PeoplePage } from "./components/PeoplePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/sign-up"} element={<SignUp />} />

        <Route path={"/"} element={<SignIn />} />

        <Route path={"/home"} element={<HomePage />} />

        <Route path={"/settings"} element={<SettingsPage />} />

        <Route path={"/profile"} element={<ProfilePage />} />

        <Route path={"/people"} element={<PeoplePage />} />
      </Routes>
    </div>
  );
}

export default App;
