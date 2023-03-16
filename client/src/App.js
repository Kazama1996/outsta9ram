import logo from "./logo.svg";
import Signup from "./Pages/Authentication/Signup";
import Login from "./Pages/Authentication/Login";
import Feed from "./Pages/Feed/Feed";
import { Navigate } from "react-router-dom";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./component/Slidebar";

const ProtectedRoute = ({ isLogin, redirectPath = "/landing", children }) => {
  if (!isLogin) {
    return <h1>Please login</h1>;
  }
  return children;
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Feed />}></Route>
      </Routes>
    </Sidebar>
  );
}

export default App;
