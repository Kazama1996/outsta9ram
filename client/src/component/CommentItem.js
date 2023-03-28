import "./style/CommentItem.css";
function CommentItem(props) {
  const { element } = props;
  return (
    <div className="item-comment">
      <div
        className="avatar-comment"
        style={{
          backgroundImage: `url(${element.avatar})`,
        }}
      ></div>
      <div>
        <div>
          {element.profileName}:{element.content}
        </div>
        <div className="createdAt-comment">{element.createdAt}</div>
      </div>
    </div>
  );
}

export default CommentItem;
