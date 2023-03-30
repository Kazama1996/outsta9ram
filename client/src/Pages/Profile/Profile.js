import "../../App.css";
import { getUserProfile } from "../../global/api";
import { useEffect, useState } from "react";
import PostGallery from "./component/PostGallery.js";
import ProfileHeader from "./component/ProfileHeader.js";
import PostWindow from "../../component/PostWindow";
function Profile() {
  //return <h1>This is profile</h1>;
  const [userProfile, setUserProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const handleClick = function (e) {
    // pop up the postWindow
    console.log(e.target.id);
  };
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getUserProfile(
          window.location.pathname.split("/")[2]
        );
        setUserProfile(res.data[0]);
        setPosts(res.data[0].Posts);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProfile();
  }, []);

  if (!posts.length) {
    return (
      <div className="page-profile">
        {" "}
        <ProfileHeader userProfile={userProfile} />
      </div>
    );
  } else {
    return (
      <div className="page-profile">
        <ProfileHeader userProfile={userProfile} />
        <PostGallery posts={posts} />
      </div>
    );
  }
}

export default Profile;

// original version

{
  /* <div className="header-profile">
        <div className="avatar-region">
          <img src={avatar} className="userPhoto" />
        </div>
        <div className="user-info">
          <h1>{window.location.pathname.split("/")[1]}</h1>
          <div className="post-and-followers">
            <h2>Post:{userProfile.PostQuantity}</h2>
            <h2>Following :{userProfile.FollowingQuantity}</h2>
            <h2>
              Followers:
              {userProfile.FollowerQuantity}
            </h2>
          </div>
          <div>
            <h4>我是簽名～～</h4>
          </div>
        </div>
      </div>
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
      </div> */
}
////
