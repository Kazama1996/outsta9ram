function PostGallery(props) {
  const posts = props.posts;
  const handleClick = function (e) {
    console.log(e.target.id);
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
    </div>
  );
}

export default PostGallery;
