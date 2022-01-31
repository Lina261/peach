import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ProfilePage } from "./components/ProfilePage";
import SignIn from "./components/Sign-in";
import SignUp from "./components/Sign-up";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/sign-up"} element={<SignUp />} />

        <Route path={"/"} element={<SignIn />} />

        <Route path={"/home"} element={<HomePage />} />

        <Route path={"/profile"} element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
