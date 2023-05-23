import Modal from "react-modal";
import { useRef } from "react";
import "./style/PostWindow.css";
import CommentItem from "./CommentItem";
import heart from "../material/heart.png";
import fillheart from "../material/fillheart.png";
import InputField from "./InputField";
import { createComment } from "../global/api";
import { likePost, cancelLike } from "../global/api";
import { getPostAttribute } from "../global/api";
function PostWindow(props) {
  const {
    setIsDisPlayPostWindow,
    isDisplayPostWindow,
    postAttrubute,
    setPostAttribute,
    comment,
    isLiked,
    setIsLiked,
    postId,
  } = props;

  const inputComment = useRef(null);

  const subitComment = async function (e) {
    console.log(postId);
    try {
      const reqBody = {
        content: inputComment.current.value,
        postId: postId,
      };
      console.log("reqbody:", reqBody);
      await createComment(reqBody);
    } catch (err) {
      console.log(err);
    }
    setIsDisPlayPostWindow(false);
  };

  const handleLike = async function () {
    let res = "";
    try {
      if (isLiked) {
        res = await cancelLike(postId);
        console.log(res);
      } else {
        res = await likePost(postId);
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLiked((current) => !current);
  };

  const closeModal = async (e) => {
    setIsDisPlayPostWindow(false);
    const att = await getPostAttribute(postId);
    setPostAttribute(att.data[0]);
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
      {/* <div className="property">
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
            <img src={isLiked ? fillheart : heart} onClick={handleLike} />
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
      </div> */}
    </Modal>
  );
}

export default PostWindow;
