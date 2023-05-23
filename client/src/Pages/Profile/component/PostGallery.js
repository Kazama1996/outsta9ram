import { useEffect, useState } from "react";
import PostWindow from "../../../component/PostWindow";
import { getPostAttribute, getComment } from "../../../global/api";
import "../style/PostGallery.css";
import heart from "../../../material/heart.png";
import commentWhite from "../../../material/comment (1).png";
function PostGallery(props) {
  const posts = props.posts;
  const [isDisplayPostWindow, setIsDisPlayPostWindow] = useState(false);
  const [postAttrubute, setPostAttribute] = useState({});
  const [comment, setCoumment] = useState([]);
  const [postId, setPostId] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = async (e) => {
    if (e.target.id) {
      setPostId(e.target.id);
      const { data: postAttribute } = await getPostAttribute(e.target.id);
      const comm = await getComment(e.target.id);
      setIsLiked(postAttribute.isLiked);
      setPostAttribute(postAttribute);
      setCoumment(comm.data);
      setIsDisPlayPostWindow(true);
    }
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
              <img src={heart} className="img-like" />
              <p>{post.LikeQuantity}</p>
              <img src={commentWhite} className="img-comment" />
              <p>{post.CommentQuantity}</p>
            </div>
          </div>
        );
      })}
      {isDisplayPostWindow && (
        <PostWindow
          isDisplayPostWindow={isDisplayPostWindow}
          setIsDisPlayPostWindow={setIsDisPlayPostWindow}
          postAttrubute={postAttrubute}
          setPostAttribute={setPostAttribute}
          comment={comment}
          postId={postId}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      )}
    </div>
  );
}

export default PostGallery;
