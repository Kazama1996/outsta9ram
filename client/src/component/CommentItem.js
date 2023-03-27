function CommentItem(props) {
  const { element } = props;
  return (
    <div>
      {element.profileName}:{element.content}
      <div>{element.createdAt}</div>
    </div>
  );
}

export default CommentItem;
