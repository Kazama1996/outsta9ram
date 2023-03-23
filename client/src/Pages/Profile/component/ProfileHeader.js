import avatar from "../image.jpg";
function ProfileHeader(props) {
  const userProfile = props.userProfile;
  return (
    <div className="header-profile">
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
  );
}

export default ProfileHeader;
