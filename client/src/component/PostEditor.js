import { useState } from "react";
import { createPost } from "../global/api";
import done from "../material/done.png";
import cancel from "../material/cancel.png";
function PostEditor(props) {
  const { isDisplayEditor, setIsDisplayEditor } = props;
  const { filePath, setFilePath } = props;
  const handleFile = function (e) {
    setFilePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = async function (e) {
    console.log(e.target.id);
    if (e.target.id === "done") {
      //call create post api;
    }
    setIsDisplayEditor(false);
  };

  return (
    <div
      className="postEditor"
      style={{ display: isDisplayEditor ? "flex" : "none" }}
    >
      <div
        className="imageWindow"
        style={{ backgroundImage: isDisplayEditor ? `url(${filePath})` : "" }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="fileUpload"
        />
      </div>

      <div className="inputField">
        <textarea className="typeField" placeholder="say something...." />
        <div className="btn-Post">
          <img src={cancel} id="cancel" onClick={handleClick} />
          <img src={done} id="done" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default PostEditor;

//<BsFillSendFill className="btnSend" onClick={handleClick} />
