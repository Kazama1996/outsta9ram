import { useRef, useState } from "react";
import { createPost, getPreSignUrl, uploadImage } from "../global/api";
import done from "../material/done.png";
import cancel from "../material/cancel.png";
import Modal from "react-modal";

// function PostEditor(props) {
//   const { isDisplayEditor, setIsDisplayEditor } = props;
//   const { filePath, setFilePath } = props;
//   const [file, setFile] = useState("");
//   const postContent = useRef(null);
//   const handleFile = function (e) {
//     setFilePath(URL.createObjectURL(e.target.files[0]));
//     setFile(e.target.files[0]);
//   };

//   const handleClick = async function (e) {
//     if (e.target.id === "done") {
//       //call create post api;
//       console.log(postContent.current.value);

//       let reqBody = {};
//       try {
//         const {
//           data: { KEY, clientUrl },
//         } = await getPreSignUrl();
//         await uploadImage(clientUrl, file);
//         reqBody = {
//           content: postContent.current.value,
//           photoPath: KEY,
//         };
//         await createPost(JSON.stringify(reqBody));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     setIsDisplayEditor(false);
//   };

//   return (
//     <div
//       className="postEditor"
//       style={{ display: isDisplayEditor ? "flex" : "none" }}
//     >
//       <div
//         className="imageWindow"
//         style={{
//           backgroundImage: isDisplayEditor ? `url(${filePath})` : "",
//         }}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFile}
//           className="fileUpload"
//         />
//       </div>

//       <div className="inputField">
//         <textarea
//           className="typeField"
//           placeholder="say something...."
//           ref={postContent}
//         />
//         <div className="btn-Post">
//           <img src={cancel} id="cancel" onClick={handleClick} />
//           <img src={done} id="done" onClick={handleClick} />
//         </div>
//       </div>
//     </div>
//   );
// }

function PostEditor(props) {
  const { isDisplayEditor, setIsDisplayEditor } = props;
  const { filePath, setFilePath } = props;
  const [file, setFile] = useState("");
  const postContent = useRef(null);

  const handleFile = function (e) {
    setFilePath(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleClick = async function (e) {
    if (e.target.id === "done") {
      let reqBody = {};
      console.log("ASDASd");
      try {
        const {
          data: { KEY, clientUrl },
        } = await getPreSignUrl();
        console.log(KEY, clientUrl);
        await uploadImage(clientUrl, file);
        reqBody = {
          content: postContent.current.value,
          photoPath: KEY,
        };
        await createPost(JSON.stringify(reqBody));
      } catch (error) {
        console.log(error);
      }
    }
    setIsDisplayEditor(false);
  };
  return (
    <Modal
      isOpen={isDisplayEditor}
      className="popupWindow-login"
      ariaHideApp={false}
    >
      <div className="postEditor">
        <div
          className="imageWindow"
          style={{
            backgroundImage: isDisplayEditor ? `url(${filePath})` : "",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="fileUpload"
          />
        </div>
        <div>
          <textarea
            className="typeField"
            placeholder="say something...."
            ref={postContent}
          />
          <div className="btn-post">
            <img src={cancel} id="cancel" onClick={handleClick} />
            <img src={done} id="done" onClick={handleClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostEditor;

//<BsFillSendFill className="btnSend" onClick={handleClick} />
