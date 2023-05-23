import React, { useEffect, useRef, useState } from "react";
import PostEditor from "./PostEditor";
import home from "../material/home.png";
import create from "../material/create.png";
import profile from "../material/profile.png";
import search from "../material/search.png";
import { protect, showSearchHistory } from "../global/api";
import { useNavigate } from "react-router-dom";
import SearchUser from "./SearchUser";
import "./style/Sidebar.css";

function Sidebar({ children }) {
  const [filePath, setFilePath] = useState("");
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [isDisplaySearch, setIsDisplaySearch] = useState(false);
  const [userList, setUserList] = useState([]);

  const [currentPage, setCurrentPage] = useState(() => {
    const storedCount = localStorage.getItem("currentPage");
    return storedCount ? parseInt(storedCount, 10) : 0;
  });
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const handleClick = async function (e) {
    try {
      const { data: currentUser } = await protect();
      switch (parseInt(e.target.id)) {
        case 0:
          navigate("/");
          break;
        case 1:
          const { data: history } = await showSearchHistory();
          setUserList(history);
          setIsDisplaySearch(true);
          break;
        case 2:
          setIsDisplayEditor(true);
          break;
        case 3:
          navigate(`/profile/${currentUser.profileName}`);
          break;
      }
    } catch (error) {
      console.log(error);
      navigate(`/login`);
    }

    setCurrentPage(parseInt(e.target.id));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <img src={home} className="btn-sidebar" id="0" onClick={handleClick} />
        <img
          src={search}
          className="btn-sidebar"
          id="1"
          onClick={handleClick}
        />
        <img
          src={create}
          className="btn-sidebar"
          id="2"
          onClick={handleClick}
        />
        <img
          src={profile}
          className="btn-sidebar"
          id="3"
          onClick={handleClick}
        />
      </div>
      <div className="pages">
        <main>{children}</main>
        <div>
          {isDisplayEditor && (
            <PostEditor
              isDisplayEditor={isDisplayEditor}
              setIsDisplayEditor={setIsDisplayEditor}
              filePath={filePath}
              setFilePath={setFilePath}
            />
          )}
        </div>
        <div>
          {isDisplaySearch && (
            <SearchUser
              isDisplaySearch={isDisplaySearch}
              setIsDisplaySearch={setIsDisplaySearch}
              userList={userList}
              setUserList={setUserList}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
