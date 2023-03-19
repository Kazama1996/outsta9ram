function InputField(props) {
  const str = props.placeholder;
  return (
    <input
      type={props.type}
      placeholder={str}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = str)}
      ref={props.reference}
    ></input>
  );
}
export default InputField;
