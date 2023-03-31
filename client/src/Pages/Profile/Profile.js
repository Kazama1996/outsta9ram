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
