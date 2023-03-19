import React, { useEffect, useRef, useState } from "react";
import PostEditor from "./PostEditor";
import Login from "./Login";
import home from "../material/home.png";
import create from "../material/create.png";
import profile from "../material/profile.png";
import search from "../material/search.png";
import { protect } from "../global/api";
function Sidebar({ children }) {
  const [current, setCurrent] = useState(-1);
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  const [filePath, setFilePath] = useState("");
  const initialValue = {
    filePath: "",
  };
  const handleClick = async function (e) {
    const targetId = parseInt(e.target.id);
    await protect()
      .then((response) => {
        setIsLogin(true);
        setCurrent(targetId);
        if (targetId === 2) {
          setIsDisplayEditor(true);
        } else {
          setIsDisplayEditor(false);
          setFilePath(initialValue.filePath);
        }
      })
      .catch((error) => {
        setIsLogin(false);
      });
  };
  return (
    <div className="container">
      <div className="sidebar">
        <div className="blank"></div>
        <div>
          <img
            src={home}
            className={`option ${current === 0 ? "select" : ""}`}
            id="0"
            onClick={handleClick}
          />
        </div>
        <div>
          <img
            src={search}
            className={`option ${current === 1 ? "select" : ""}`}
            id="1"
            onClick={handleClick}
          />
        </div>
        <div>
          <img
            src={create}
            className={`option ${current === 2 ? "select" : ""}`}
            id="2"
            onClick={handleClick}
          />
        </div>
        <div className="blank"></div>

        <div>
          <img
            src={profile}
            className={`option ${current === 3 ? "select" : ""}`}
            id="3"
            onClick={handleClick}
          />
        </div>
      </div>

      <main className="pages">
        {children}
        <PostEditor
          isDisplayEditor={isDisplayEditor}
          setIsDisplayEditor={setIsDisplayEditor}
          filePath={filePath}
          setFilePath={setFilePath}
        />
        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      </main>
    </div>
  );
}
export default Sidebar;
