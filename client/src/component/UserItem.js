import "./style/FollowerItem.css";
import { useNavigate } from "react-router-dom";
import { addSearchHistory } from "../global/api";
function UserItem(props) {
  const { user, setDisplayUserList } = props;
  const navigate = useNavigate();
  const handleClick = async function (e) {
    const targetName = e.target.outerText || e.target.parentElement.outerText;
    const reqBody = {
      avatar: user.avatar,
      profileName: user.profileName,
    };
    const res = await addSearchHistory(JSON.stringify(reqBody));
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
