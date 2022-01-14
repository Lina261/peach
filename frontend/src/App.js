import './App.css';
import {RegistrationPage} from "./components/RegistrationPage";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/LoginPage";
import {HomePage} from "./components/HomePage";

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path={"/registration"} element={<RegistrationPage/>}/>

        <Route path={"/"} element={<LoginPage/>}/>

        <Route path={"/home"} element={<HomePage/>}/>

    </Routes>
    </div>
  );
}

export default App;
