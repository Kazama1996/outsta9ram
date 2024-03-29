import { getUserProfile, protect } from "../../global/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostGallery from "./component/PostGallery.js";
import ProfileHeader from "./component/ProfileHeader.js";

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isSameUser, setIsSameUser] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const currentUser = (await protect()).data;
        const { data: userProfile } = await getUserProfile(
          window.location.pathname.split("/")[2]
        );
        setUserProfile(userProfile);
        setPosts(userProfile.Posts);
        if (
          currentUser.profileName === window.location.pathname.split("/")[2]
        ) {
          setIsSameUser(true);
        } else {
          setIsFollowed(userProfile.isFollowed);
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
