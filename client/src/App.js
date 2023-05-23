import logo from "./logo.svg";
import Login from "./Pages/Authentication/Login";
import Feed from "./Pages/Feed/Feed";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Profile from "./Pages/Profile/Profile";
import PasswordReset from "./Pages/Authentication/PasswordReset";
import Signup from "./Pages/Authentication/Signup";
import FrogotPassword from "./Pages/Authentication/ForgotPassword";
import ProfileEditor from "./Pages/Profile/ProfileEditor";
function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:profileName" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<FrogotPassword />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/edit/:profileName" element={<ProfileEditor />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
