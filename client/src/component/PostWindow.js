import Modal from "react-modal";
import { useEffect, useState } from "react";
import "./style/PostWindow.css";
import CommentItem from "./CommentItem";
import heart from "../material/heart.png";
import fillheart from "../material/fillheart.png";
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
          backgroundImage: `url(${`https://outsta9ram-bucket.s3.ap-northeast-1.amazonaws.com/6417dcda9a1c903de7efe7b5/21e90c83-6856-44a7-9bdb-f3c30b17d9f6.jpeg`})`,
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
          <div>
            <img src={likeState ? fillheart : heart} onClick={handleLike} />
          </div>
          <div>createdAt</div>
        </div>
        <input type="text" />
      </div>
      <div></div>
    </Modal>
  );
}

export default PostWindow;
