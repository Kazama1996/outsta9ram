import React, { useEffect, useRef, useState } from "react";

import PostEditor from "./PostEditor";
import Login from "./Login";
import home from "../material/home.png";
import create from "../material/create.png";
import profile from "../material/profile.png";
import search from "../material/search.png";
import { protect } from "../global/api";
import { useNavigate } from "react-router-dom";
// function Sidebar({ children }) {
//   const [current, setCurrent] = useState(0);
//   const [isDisplayEditor, setIsDisplayEditor] = useState(false);
//   const [isLogin, setIsLogin] = useState(-1);
//   const [filePath, setFilePath] = useState("");
//   const navigate = useNavigate();

//   console.log(current);
//   const initialValue = {
//     filePath: "",
//   };
//   const handleClick = async function (e) {
//     const targetId = parseInt(e.target.id);
//     await protect()
//       .then((response) => {
//         setIsLogin(true);
//         setCurrent(targetId);
//         if (targetId === 0) {
//           navigate("/");
//         }
//         if (targetId === 2) {
//           setIsDisplayEditor(true);
//         } else {
//           setIsDisplayEditor(false);
//           setFilePath(initialValue.filePath);
//         }
//         if (targetId === 3) {
//           navigate(`/${response.data.profileName}`);
//         }
//       })
//       .catch((error) => {
//         setIsLogin(false);
//       });
//   };
//   return (
//     <div className="container">
//       <div className="sidebar">
//         <div className="blank"></div>
//         <div>
//           <img
//             src={home}
//             className={`option ${current === 0 ? "select" : ""}`}
//             id="0"
//             onClick={handleClick}
//           />
//         </div>
//         <div>
//           <img
//             src={search}
//             className={`option ${current === 1 ? "select" : ""}`}
//             id="1"
//             onClick={handleClick}
//           />
//         </div>
//         <div>
//           <img
//             src={create}
//             className={`option ${current === 2 ? "select" : ""}`}
//             id="2"
//             onClick={handleClick}
//           />
//         </div>
//         <div className="blank"></div>

//         <div>
//           <img
//             src={profile}
//             className={`option ${current === 3 ? "select" : ""}`}
//             id="3"
//             onClick={handleClick}
//           />
//         </div>
//       </div>

//       <main className={current === 3 ? "profile" : "page"}>
//         {children}
//         <PostEditor
//           isDisplayEditor={isDisplayEditor}
//           setIsDisplayEditor={setIsDisplayEditor}
//           filePath={filePath}
//           setFilePath={setFilePath}
//         />
//         <Login isLogin={isLogin} setIsLogin={setIsLogin} />
//       </main>
//     </div>
//   );
// }

function Sidebar({ children }) {
  const [filePath, setFilePath] = useState("");
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const storedCount = localStorage.getItem("currentPage");
    return storedCount ? parseInt(storedCount, 10) : 0;
  });
  const [isOpenLoginPage, setIsOpenLoginPage] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const handleClick = async function (e) {
    await protect()
      .then((response) => {
        switch (parseInt(e.target.id)) {
          case 0:
            navigate("/");
            break;
          case 1:
            break;
          case 2:
            setIsDisplayEditor(true);
            break;
          case 3:
            navigate(`/${response.data.profileName}`);
            break;
        }
      })
      .catch((err) => {
        setIsOpenLoginPage(true);
      });

    setCurrentPage(parseInt(e.target.id));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <img src={home} className="" id="0" onClick={handleClick} />
        <img src={search} className="" id="1" onClick={handleClick} />
        <img src={create} className="" id="2" onClick={handleClick} />
        <img src={profile} className="" id="3" onClick={handleClick} />
      </div>
      <div className="pages">
        <main>{children}</main>
        <Login
          isOpenLoginPage={isOpenLoginPage}
          setIsOpenLoginPage={setIsOpenLoginPage}
        />
        <PostEditor
          isDisplayEditor={isDisplayEditor}
          setIsDisplayEditor={setIsDisplayEditor}
          filePath={filePath}
          setFilePath={setFilePath}
        />
      </div>
    </div>
  );
}

export default Sidebar;
