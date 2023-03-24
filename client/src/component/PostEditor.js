import { useRef, useState } from "react";
import { createPost, getPreSignUrl, uploadImage } from "../global/api";
import done from "../material/done.png";
import cancel from "../material/cancel.png";
import Modal from "react-modal";
import "./style/PostEditor.css";

function PostEditor(props) {
  const { isDisplayEditor, setIsDisplayEditor } = props;
  const { filePath, setFilePath } = props;
  const [file, setFile] = useState("");
  const postContent = useRef(null);

  const handleFile = function (e) {
    setFilePath(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const closeModal = function () {
    setIsDisplayEditor(false);
  };

  const handleClick = async function (e) {
    if (e.target.id === "done") {
      let reqBody = {};
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
      className="editor-post"
      ariaHideApp={false}
      overlayClassName="editor-post-overlay"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <div
        className="window-preview"
        style={{
          backgroundImage: isDisplayEditor ? `url(${filePath})` : "",
        }}
      >
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>
      <div>
        <textarea
          className="input-postcontent"
          placeholder="say something...."
          ref={postContent}
        />
        <div className="btn-post">
          <img src={cancel} id="cancel" onClick={handleClick} />
          <img src={done} id="done" onClick={handleClick} />
        </div>
      </div>
    </Modal>
  );
}

export default PostEditor;
