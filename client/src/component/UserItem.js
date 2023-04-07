import "./style/FollowerItem.css";
import { useNavigate } from "react-router-dom";
function UserItem(props) {
  const { user, setDisplayUserList } = props;
  const navigate = useNavigate();
  const handleClick = function (e) {
    const targetName = e.target.outerText || e.target.parentElement.outerText;
    navigate(`/profile/${targetName}`);
    setDisplayUserList(false);
  };

  return (
    <div className="container-follower-item" onClick={handleClick}>
      <div
        className="avatar-follower"
        style={{ backgroundImage: `url(${user.avatar})` }}
      ></div>
      <div>{user.profileName}</div>
    </div>
  );
}
export default UserItem;
