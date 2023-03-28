import Modal from "react-modal";
import { useEffect, useState } from "react";
import "./style/PostWindow.css";
import CommentItem from "./CommentItem";
import heart from "../material/heart.png";
import fillheart from "../material/fillheart.png";
import InputField from "./InputField";
import {
  isLikeBefore,
  likePost,
  cancelLike,
  getPostAttribute,
} from "../global/api";
function PostWindow(props) {
  const {
    isDisplayPostWindow,
    postAttrubute,
    setPostAttribute,
    closeModal,
    comment,
    likeState,
    setLikeState,
    postId,
  } = props;

  const handleLike = async function () {
    let res = "";
    try {
      if (likeState) {
        res = await cancelLike(postId);
      } else {
        res = await likePost(postId);
      }
    } catch (err) {
      console.log(err);
    }
    setLikeState((current) => !current);
  };
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
          backgroundImage: `url(${postAttrubute.photoPath})`,
        }}
      ></div>
      <div className="property">
        <div className="user">{postAttrubute.author}</div>
        <div className="content">{postAttrubute.content}</div>
        <div className="comment">
          {comment.map((el, index) => {
            return <CommentItem element={el} />;
          })}
        </div>
        <div>
          <div className="btn-like">
            <img src={likeState ? fillheart : heart} onClick={handleLike} />
          </div>
          <div>{postAttrubute.createdAt}</div>
        </div>
        <InputField placeholder={"Leave a comment "} />
      </div>
      <div></div>
    </Modal>
  );
}

export default PostWindow;
