import gear from "../../../material/setting.png";
import "../style/PostHeader.css";
import SettingMenu from "./SettingMenu";
import { useState } from "react";
import {
  fetchFollower,
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../../../global/api";
import FollowerList from "./FollowerList";

function ProfileHeader(props) {
  const { userProfile, isSameUser, isFollowed, setIsFollowed } = props;
  const [isDisplaySetting, setIsDisplaySetting] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const openFollowingList = async function () {
    const res = await fetchFollowing(userProfile.profileName, 1);
    const data = res.data;
    setFollowerList(data);
    setIsFollowing(true);
    setIsOpenModal(true);
  };
  const openFollowerList = async function () {
    const res = await fetchFollower(userProfile.profileName, 1);
    const data = res.data;
    setFollowerList(data);
    setIsFollowing(false);
    setIsOpenModal(true);
  };

  const openSetting = function () {
    setIsDisplaySetting(true);
  };

  const FollowUser = async function (e) {
    console.log("follow");
    await followUser(window.location.pathname.split("/")[2]);
    setIsFollowed((current) => !current);
  };
  const unFollowUser = async function (e) {
    console.log("unfollow");
    await unfollowUser(window.location.pathname.split("/")[2]);
    setIsFollowed((current) => !current);
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
          ) : isFollowed ? (
            <button onClick={unFollowUser}>unFollow</button>
          ) : (
            <button onClick={FollowUser}>Follow</button>
          )}
        </div>
        <div className="post-and-followers">
          <h2>Post:{userProfile.PostQuantity}</h2>
          <h2 onClick={openFollowingList} className="following">
            Following :{userProfile.FollowingQuantity}
          </h2>
          <h2 onClick={openFollowerList} className="followers">
            Followers:
            {userProfile.FollowerQuantity}
            {console.log(userProfile)}
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
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isFollowing={isFollowing}
        setIsFollowing={setIsFollowing}
        userProfile={userProfile}
      />
    </div>
  );
}

export default ProfileHeader;
