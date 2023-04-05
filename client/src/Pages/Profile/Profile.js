import "../../App.css";
import { getUserProfile, protect } from "../../global/api";
import { Children, useEffect, useState } from "react";
import PostGallery from "./component/PostGallery.js";
import ProfileHeader from "./component/ProfileHeader.js";
import PostWindow from "../../component/PostWindow";
function Profile() {
  //return <h1>This is profile</h1>;
  const [userProfile, setUserProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isSameUser, setIsSameUser] = useState(true);

  const handleClick = function (e) {
    // pop up the postWindow
    console.log(e.target.id);
  };
  useEffect(() => {
    async function fetchProfile() {
      try {
        const currentUser = (await protect()).data;
        console.log(currentUser.profileName);
        const res = await getUserProfile(
          window.location.pathname.split("/")[2]
        );
        setUserProfile(res.data[0]);
        setPosts(res.data[0].Posts);
        if (
          currentUser.profileName === window.location.pathname.split("/")[2]
        ) {
          console.log("Same");
          setIsSameUser(true);
        } else {
          console.log("Not Same");
          setIsSameUser(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchProfile();
  }, []);

  if (!posts.length) {
    return (
      <div className="page-profile">
        <ProfileHeader userProfile={userProfile} isSameUser={isSameUser} />
      </div>
    );
  } else {
    return (
      <div className="page-profile">
        <ProfileHeader userProfile={userProfile} isSameUser={isSameUser} />
        <PostGallery posts={posts} />
      </div>
    );
  }
}

export default Profile;
