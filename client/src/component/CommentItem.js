import "./style/CommentItem.css";
import { redirect, useNavigate } from "react-router-dom";
function CommentItem(props) {
  const navigate = useNavigate();
  const { element, setIsDisPlayPostWindow } = props;
  const handleClick = function (e) {
    setIsDisPlayPostWindow(false);
    navigate(`/profile/${e.target.textContent}`);
  };
  return (
    <div className="item-comment">
      <div
        className="avatar-comment"
        style={{
          backgroundImage: `url(${element.avatar})`,
        }}
      ></div>
      <div>
        <div onClick={handleClick} className="profileName-comment">
          {element.profileName}{" "}
        </div>
        <div>{element.content}</div>
        <div className="createdAt-comment">{element.createdAt}</div>
      </div>
    </div>
  );
}

export default CommentItem;
