import InputField from "./InputField";
import { useRef, useState } from "react";
import { login } from "../global/api";
function Login(props) {
  //const [email, setEmail] = new useState("");
  //const [password, setPassword] = new useState("");
  const { isLogin, setIsLogin } = props;
  const email = useRef(null);
  const password = useRef(null);
  const submitLogin = async function () {
    const reqBody = {
      email: email.current.value,
      password: password.current.value,
    };
    await login(JSON.stringify(reqBody))
      .then((response) => {
        setIsLogin(true);
      })
      .catch((error) => {
        setIsLogin(false);
      });
  };

  return (
    <div className="loginPage" style={{ display: isLogin ? "none" : "block" }}>
      <h2>Please log in for more experience</h2>
      <div>
        <InputField type={"text"} placeholder={"Email"} reference={email} />
      </div>
      <div>
        <InputField
          type={"password"}
          placeholder={"Password"}
          reference={password}
        />
      </div>
      <div>
        <button onClick={submitLogin}> Login</button>
      </div>
    </div>
  );
}

export default Login;
