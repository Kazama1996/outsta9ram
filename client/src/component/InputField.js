function InputField(props) {
  return (
    <input
      className={props.className}
      type={props.type}
      placeholder={props.placeholder}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = props.placeholder)}
      ref={props.reference}
    ></input>
  );
}
export default InputField;
