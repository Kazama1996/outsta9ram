import "./styles/Signup.css";
import InputField from "./component/InputField";
import { useState } from "react";
import { signup } from "../../global/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = new useState("");
  const [fullName, setFullName] = new useState("");
  const [profileName, setprofileName] = new useState("");
  const [password, setPassword] = new useState("");
  let navigate = useNavigate();

  const handleClick = async function () {
    const reqBody = {
      email: email,
      fullName: fullName,
      profileName: profileName,
      password: password,
    };
    await signup(JSON.stringify(reqBody)).then((response) => {
      //TODO : receive the token by server and save into the browser cookie.
      console.log(response);
      console.log("cookie:", document.cookie);
    });
  };

  const redirectToLogin = function () {
    navigate("/login");
  };

  return (
    <div className="signup">
      <InputField type={"text"} placeholder={"Email"} setData={setEmail} />
      <InputField
        type={"text"}
        placeholder={"FullName"}
        setData={setFullName}
      />
      <InputField
        type={"text"}
        placeholder={"profileName"}
        setData={setprofileName}
      />
      <InputField
        type={"password"}
        placeholder={"Password"}
        setData={setPassword}
      />
      <input
        type="submit"
        className="btn_register"
        value="sign up"
        onClick={handleClick}
      ></input>
      <input
        type="submit"
        className="aaaa"
        value="Have account??"
        onClick={redirectToLogin}
      ></input>
    </div>
  );
}

export default Signup;
