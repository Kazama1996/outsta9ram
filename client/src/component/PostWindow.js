import Modal from "react-modal";
import { useState } from "react";
import "./style/PostWindow.css";
function PostWindow(props) {
  const {
    postAttrubute,
    isDisplayPostWindow,
    setIsDisPlayPostWindow,
    closeModal,
  } = props;
  return (
    <Modal
      isOpen={isDisplayPostWindow}
      className="window-post"
      overlayClassName="window-post-overlay"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <div
        className="image"
        style={{
          backgroundImage: `url(${`https://outsta9ram-bucket.s3.ap-northeast-1.amazonaws.com/6417dcda9a1c903de7efe7b5/21e90c83-6856-44a7-9bdb-f3c30b17d9f6.jpeg`})`,
        }}
      ></div>
      <div className="property">
        <div className="user"></div>
        <div className="content">{postAttrubute.content}</div>
        <div className="comment"></div>
        <div>
          <button>LikeButton</button>
          <div>CreateAt</div>
        </div>
        <input type="text" />
      </div>
      <div></div>
    </Modal>
  );
}

export default PostWindow;
