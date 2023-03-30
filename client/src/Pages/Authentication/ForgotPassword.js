import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { forgotPassword } from "../../global/api";
import Modal from "react-modal";
import InputField from "../../component/InputField";
function FrogotPassword() {
  const email = useRef(null);
  const navigate = useNavigate();
  const submitForgotPwd = async function () {
    const reqBody = {
      email: email.current.value,
    };
    await forgotPassword(JSON.stringify(reqBody))
      .then(navigate("/login"))
      .catch((error) => {
        console.log(error);
      });
  };
  const redirectLogin = function () {
    navigate("/login");
  };
  return (
    <Modal isOpen={true} className="popupWindow-login" ariaHideApp={false}>
      <h2>Fill your email to save your account</h2>

      <div>
        <InputField type={"text"} placeholder={"Email"} reference={email} />
      </div>

      <button onClick={submitForgotPwd}>Get resetToken</button>
      <div>
        <button onClick={redirectLogin}>Have account?</button>
      </div>
    </Modal>
  );
}
export default FrogotPassword;
