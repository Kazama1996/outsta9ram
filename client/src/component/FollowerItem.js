import "./style/FollowerItem.css";
import { useNavigate } from "react-router-dom";
function FollowerItem(props) {
  const { follower, setDisplayFollowerList } = props;
  const navigate = useNavigate();
  const handleClick = function (e) {
    const targetName = e.target.outerText || e.target.parentElement.outerText;
    navigate(`/profile/${targetName}`);
    setDisplayFollowerList(false);
  };

  return (
    <div className="container-follower-item" onClick={handleClick}>
      <div
        className="avatar-follower"
        style={{ backgroundImage: `url(${follower.avatar})` }}
      ></div>
      <div>{follower.profileName}</div>
    </div>
  );
}
export default FollowerItem;
