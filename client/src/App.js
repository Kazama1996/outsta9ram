import logo from "./logo.svg";
import Signup from "./Pages/Authentication/Signup";
import "./App.css";
import Login from "./Pages/Authentication/Login";
import Feed from "./Pages/Feed/Feed";
import { Navigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const ProtectedRoute = ({ isLogin, redirectPath = "/landing", children }) => {
  if (!isLogin) {
    return <h1>Please login</h1>;
  }
  return children;
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route
          path="/login"
          element={<Login setIsLogin={setIsLogin} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup setIsLogin={setIsLogin} />}
        ></Route>
        <Route
          path="/feed"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Feed />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
