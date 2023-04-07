import InputField from "../../component/InputField";
import { useRef } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { login } from "../../global/api";
function Login(props) {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const submitLogin = async function () {
    const reqBody = {
      email: email.current.value,
      password: password.current.value,
    };
    await login(JSON.stringify(reqBody))
      .then((response) => {
        navigate(`/profile/${response.data.profileName}`);
      })
      .catch((error) => {
        navigate("/login");
        console.log(error);
      });
  };

  const redirectSignup = function () {
    navigate("/signup");
  };
  const redirectForgotPwd = function () {
    navigate("/forgotPassword");
  };

  return (
    <Modal isOpen={true} className="popupWindow-login" ariaHideApp={false}>
      <h2>Please login for more experience</h2>

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
      <div>
        <button onClick={redirectSignup}>I don't have an account</button>
        <button onClick={redirectForgotPwd}>Forgot password?</button>
      </div>
    </Modal>
  );
}

export default Login;
