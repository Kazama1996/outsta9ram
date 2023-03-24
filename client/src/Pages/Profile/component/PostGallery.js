import { useState } from "react";
import PostWindow from "../../../component/PostWindow";
import Modal from "react-modal";

function PostGallery(props) {
  const posts = props.posts;
  const [isDisplayPostWindow, setIsDisPlayPostWindow] = useState(false);

  const handleClick = (e) => {
    console.log(e.target.id);
    setIsDisPlayPostWindow(true);
  };
  const closeModal = (e) => {
    setIsDisPlayPostWindow(false);
  };

  if (!posts.length) return <h3>Loading...</h3>;
  return (
    <div className="gallery">
      {posts.map((post, index) => {
        return (
          <div
            className="gallery-item"
            style={{
              backgroundImage: `url(${`https://outsta9ram-bucket.s3.ap-northeast-1.amazonaws.com/${post.photoPath}`})`,
            }}
            onClick={handleClick}
            key={post._id}
          >
            <div className="overlay" id={post._id} onClick={handleClick}>
              <div>
                <h3>{`Likes:${post.LikeQuantity}`}</h3>
              </div>
              <div>
                <h3>{`Comment:${post.CommentQuantity}`}</h3>
              </div>{" "}
            </div>
          </div>
        );
      })}
      <PostWindow
        isDisplayPostWindow={isDisplayPostWindow}
        closeModal={closeModal}
      />
    </div>
  );
}

export default PostGallery;
