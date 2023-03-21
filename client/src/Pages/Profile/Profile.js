import "../../App.css";
import avatar from "./image.jpg";

function Profile() {
  //return <h1>This is profile</h1>;

  return (
    <div className="page-profile">
      <div className="header-profile">
        <div className="avatar-region">
          <img src={avatar} className="userPhoto" />
        </div>
        <div className="user-info">
          <h1>{window.location.pathname.split("/")[1]}</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
