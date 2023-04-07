import "../../App.css";
import { getUserProfile, protect } from "../../global/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostGallery from "./component/PostGallery.js";
import ProfileHeader from "./component/ProfileHeader.js";

function Profile() {
  //return <h1>This is profile</h1>;
  const [userProfile, setUserProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isSameUser, setIsSameUser] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const location = useLocation();

  const handleClick = function (e) {
    // pop up the postWindow
    console.log(e.target.id);
  };
  useEffect(() => {
    async function fetchProfile() {
      try {
        const currentUser = (await protect()).data;
        const { data: userProfile } = await getUserProfile(
          window.location.pathname.split("/")[2]
        );
        setUserProfile(userProfile[0]);
        setPosts(userProfile[0].Posts);
        if (
          currentUser.profileName === window.location.pathname.split("/")[2]
        ) {
          setIsSameUser(true);
        } else {
          setIsFollowed(userProfile[0].isFollowed);
          setIsSameUser(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchProfile();
  }, [location]);

  if (!posts.length) {
    return (
      <div className="page-profile">
        <ProfileHeader
          userProfile={userProfile}
          isSameUser={isSameUser}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
        />
      </div>
    );
  } else {
    return (
      <div className="page-profile">
        <ProfileHeader
          userProfile={userProfile}
          isSameUser={isSameUser}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
        />
        <PostGallery posts={posts} />
      </div>
    );
  }
}

export default Profile;
