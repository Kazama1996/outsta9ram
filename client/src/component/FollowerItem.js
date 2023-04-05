import "./style/FollowerItem.css";
function FollowerItem(props) {
  const { follower } = props;
  return (
    <div className="container-follower-item">
      <div
        className="avatar-follower"
        style={{ backgroundImage: `url(${follower.avatar})` }}
      ></div>
      <div>{follower.profileName}</div>
    </div>
  );
}
export default FollowerItem;
