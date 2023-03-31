import gear from "../../../material/setting.png";
import "../style/PostHeader.css";
import SettingMenu from "./SettingMenu";
import { useState } from "react";
function ProfileHeader(props) {
  const userProfile = props.userProfile;
  const [isDisplaySetting, setIsDisplaySetting] = useState(false);
  const getFollowing = function () {
    console.log("Following");
  };
  const getFollowers = function () {
    console.log("Followers");
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
          <img src={gear} onClick={openSetting} />
        </div>
        <div className="post-and-followers">
          <h2>Post:{userProfile.PostQuantity}</h2>
          <h2 onClick={getFollowing}>
            Following :{userProfile.FollowingQuantity}
          </h2>
          <h2 onClick={getFollowers}>
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
    </div>
  );
}

export default ProfileHeader;
