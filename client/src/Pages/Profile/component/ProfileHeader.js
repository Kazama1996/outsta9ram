import gear from "../../../material/setting.png";
import "../style/PostHeader.css";
import SettingMenu from "./SettingMenu";
import { useState } from "react";
import { fetchFollower, fetchFollowing } from "../../../global/api";
import FollowerList from "./FollowerList";

function ProfileHeader(props) {
  const { userProfile, isSameUser } = props;
  const [isDisplaySetting, setIsDisplaySetting] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [isDisplayFollowerList, setDisplayFollowerList] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const getFollowing = async function () {
    const res = await fetchFollowing(userProfile.profileName, 1);
    const data = res.data;
    setFollowerList(data);
    setIsFollower(false);
    setDisplayFollowerList(true);
  };
  const getFollowers = async function () {
    const res = await fetchFollower(userProfile.profileName, 1);
    const data = res.data;
    setFollowerList(data);
    setIsFollower(true);
    setDisplayFollowerList(true);
  };

  const openSetting = function () {
    setIsDisplaySetting(true);
  };
  return (
    <div className="header-profile">
      <div className="avatar-region">
        <img src={userProfile.avatar} className="userPhoto" />
      </div>
      <div className="user-info">
        <div className="profileName-and-seting">
          {window.location.pathname.split("/")[2]}
          {isSameUser ? (
            <img src={gear} onClick={openSetting} />
          ) : (
            <button>Follow</button>
          )}
        </div>
        <div className="post-and-followers">
          <h2>Post:{userProfile.PostQuantity}</h2>
          <h2 onClick={getFollowing} className="following">
            Following :{userProfile.FollowingQuantity}
          </h2>
          <h2 onClick={getFollowers} className="followers">
            Followers:
            {userProfile.FollowerQuantity}
          </h2>
        </div>
        <div>
          <h4>{userProfile.signature}</h4>
        </div>
      </div>
      <SettingMenu
        isDisplaySetting={isDisplaySetting}
        setIsDisplaySetting={setIsDisplaySetting}
        userProfile={userProfile}
      />
      <FollowerList
        followerList={followerList}
        setFollowerList={setFollowerList}
        isDisplayFollowerList={isDisplayFollowerList}
        setDisplayFollowerList={setDisplayFollowerList}
        isFollower={isFollower}
        setIsFollower={setIsFollower}
        userProfile={userProfile}
      />
    </div>
  );
}

export default ProfileHeader;
