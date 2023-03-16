import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React, { useRef, useState } from "react";

function Sidebar({ children }) {
  const [isActive, setIsActive] = useState("false");
  const [fileName, setFileName] = useState({});
  function handleClick() {
    setIsActive((current) => !current);
  }

  function handleFile(event) {
    setFileName(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <div className="container">
      <div className="options">
        {
          <FaInstagramSquare
            onClick={handleClick}
            className={isActive ? "" : "click"}
          />
        }
      </div>
      <div className="blank"></div>
      <div className="options">
        {<FaHome onClick={handleClick} className={isActive ? "" : "click"} />}
      </div>
      <div className="options">
        {<FaSearch onClick={handleClick} className={isActive ? "" : "click"} />}
      </div>
      <div className="options">
        {
          <FaPlusSquare
            onClick={handleClick}
            className={isActive ? "" : "click"}
          />
        }
      </div>

      <div className={isActive ? "none" : "postEditor"}>
        <img src={fileName} />
        <input
          onChange={handleFile.bind(this)}
          type="file"
          accept="image/*"
          className={isActive ? "none" : "file-selector"}
        />
      </div>
    </div>
  );
}
export default Sidebar;
