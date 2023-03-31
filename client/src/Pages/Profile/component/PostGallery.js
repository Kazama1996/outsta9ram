import { useEffect, useState } from "react";
import PostWindow from "../../../component/PostWindow";
import {
  getPostAttribute,
  getComment,
  isLikeBefore,
} from "../../../global/api";
import "../style/PostGallery.css";
import heart from "../../../material/like.png";
import commentWhite from "../../../material/comment.png";
function PostGallery(props) {
  const posts = props.posts;
  const [isDisplayPostWindow, setIsDisPlayPostWindow] = useState(false);
  const [postAttrubute, setPostAttribute] = useState({});
  const [comment, setCoumment] = useState([]);
  const [likeState, setLikeState] = useState({});
  const [postId, setPostId] = useState("");

  const handleClick = async (e) => {
    if (e.target.id) {
      setPostId(e.target.id);
      const att = await getPostAttribute(e.target.id);
      const comm = await getComment(e.target.id);
      const isReadyLike = await isLikeBefore(e.target.id);
      if (isReadyLike.data) {
        setLikeState(true);
      } else {
        setLikeState(false);
      }
      setPostAttribute(att.data[0]);
      setCoumment(comm.data);
      setIsDisPlayPostWindow(true);
    }
  };
  const closeModal = async (e) => {
    setIsDisPlayPostWindow(false);
    const att = await getPostAttribute(postId);
    setPostAttribute(att.data[0]);
    window.location.reload(true);
  };

  if (!posts.length) return <h3>Loading...</h3>;
  return (
    <div className="gallery">
      {posts.map((post, index) => {
        return (
          <div
            className="gallery-item"
            onClick={handleClick}
            style={{
              backgroundImage: `url(${post.photoPath})`,
            }}
            key={post._id}
          >
            <div className="overlay" id={post._id}>
              <div>
                <img src={heart} className="img-like" />
              </div>
              <div>
                <img src={commentWhite} className="img-comment" />
              </div>
            </div>
          </div>
        );
      })}
      <PostWindow
        isDisplayPostWindow={isDisplayPostWindow}
        setIsDisPlayPostWindow={setIsDisPlayPostWindow}
        closeModal={closeModal}
        postAttrubute={postAttrubute}
        setPostAttribute={setPostAttribute}
        comment={comment}
        likeState={likeState}
        setLikeState={setLikeState}
        postId={postId}
      />
    </div>
  );
}

export default PostGallery;
