import InputField from "../../component/InputField";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../global/api";
function PasswordReset() {
  const newPassword = useRef(null);
  const navigate = useNavigate();

  const submitNewPassword = async function () {
    const reqBody = {
      password: newPassword.current.value,
    };
    await resetPassword(JSON.stringify(reqBody))
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const redirectLogin = function () {
    navigate("/login");
  };
  return (
    <Modal isOpen={true} className="popupWindow-login" ariaHideApp={false}>
      <h2>Fill your new password below and submit</h2>

      <div>
        <InputField
          type={"password"}
          placeholder={"newPassword"}
          reference={newPassword}
        />
      </div>

      <button onClick={submitNewPassword}>Reset password</button>
    </Modal>
  );
}

export default PasswordReset;
