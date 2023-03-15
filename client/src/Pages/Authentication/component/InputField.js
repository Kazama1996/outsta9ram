function InputField(props, { setData }) {
  const str = props.placeholder;
  const handleChange = (e) => {
    props.setData(e.target.value);
  };
  return (
    <input
      type={props.type}
      placeholder={str}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = str)}
      onChange={handleChange}
    ></input>
  );
}
export default InputField;
