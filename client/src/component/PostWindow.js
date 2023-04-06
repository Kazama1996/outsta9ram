import Modal from "react-modal";
import { useEffect, useState, useRef } from "react";
import "./style/PostWindow.css";
import CommentItem from "./CommentItem";
import heart from "../material/heart.png";
import fillheart from "../material/fillheart.png";
import InputField from "./InputField";
import { createComment } from "../global/api";
import {
  isLikeBefore,
  likePost,
  cancelLike,
  getPostAttribute,
} from "../global/api";
function PostWindow(props) {
  const {
    setIsDisPlayPostWindow,
    isDisplayPostWindow,
    postAttrubute,
    closeModal,
    comment,
    likeState,
    setLikeState,
    postId,
  } = props;

  const inputComment = useRef(null);

  const subitComment = async function (e) {
    try {
      const reqBody = {
        content: inputComment.current.value,
      };
      await createComment(postId, reqBody);
    } catch (err) {
      console.log(err);
    }
    setIsDisPlayPostWindow(false);
    window.location.reload(true);
  };

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
        <div className="user">
          <div
            className="avatar-user"
            style={{
              backgroundImage: `url(${postAttrubute.avatar})`,
            }}
          ></div>
          {postAttrubute.author}
        </div>
        <div className="content">{postAttrubute.content}</div>
        <div className="comment">
          {comment.map((el, index) => {
            return (
              <CommentItem
                element={el}
                key={index}
                setIsDisPlayPostWindow={setIsDisPlayPostWindow}
              />
            );
          })}
        </div>
        <div>
          <div className="btn-like">
            <img src={likeState ? fillheart : heart} onClick={handleLike} />
          </div>
          <div>{postAttrubute.createdAt}</div>
        </div>
        <div className="editor-comment">
          <InputField
            placeholder={"Leave a comment "}
            className={"input-content"}
            reference={inputComment}
          />
          <button onClick={subitComment}>publish</button>
        </div>
      </div>
      <div></div>
    </Modal>
  );
}

export default PostWindow;
