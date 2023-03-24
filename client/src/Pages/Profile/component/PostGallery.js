import { useState } from "react";
import PostWindow from "../../../component/PostWindow";
import { getPostAttribute } from "../../../global/api";
import Modal from "react-modal";
import "./style/PostGallery.css";
function PostGallery(props) {
  const posts = props.posts;
  const [isDisplayPostWindow, setIsDisPlayPostWindow] = useState(false);
  const [postAttrubute, setPostAttribute] = useState({});
  const handleClick = async (e) => {
    if (e.target.id) {
      //console.log(e.target.id);
      getPostAttribute(e.target.id)
        .then((response) => {
          setPostAttribute(response.data[0]);
          console.log(postAttrubute);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsDisPlayPostWindow(true);
    }
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
            onClick={handleClick}
            style={{
              backgroundImage: `url(${`https://outsta9ram-bucket.s3.ap-northeast-1.amazonaws.com/${post.photoPath}`})`,
            }}
            key={post._id}
          >
            <div className="overlay" id={post._id}>
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
        postAttrubute={postAttrubute}
      />
    </div>
  );
}

export default PostGallery;
