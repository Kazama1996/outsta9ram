import InputField from "./InputField";
import { useRef, useState } from "react";
import { login } from "../global/api";
import Modal from "react-modal";

function Login(props) {
  const { isOpenLoginPage, setIsOpenLoginPage } = props;
  const email = useRef(null);
  const password = useRef(null);

  const submitLogin = async function () {
    const reqBody = {
      email: email.current.value,
      password: password.current.value,
    };
    await login(JSON.stringify(reqBody))
      .then((response) => {
        setIsOpenLoginPage(false);
      })
      .catch((error) => {
        setIsOpenLoginPage(true);
        console.log(error);
      });
  };

  return (
    <Modal
      isOpen={isOpenLoginPage}
      className="popupWindow-login"
      ariaHideApp={false}
    >
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

      <button onClick={submitLogin}>Login</button>
    </Modal>
  );
}

export default Login;
