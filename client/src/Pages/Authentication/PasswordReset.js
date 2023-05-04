import InputField from "../../component/InputField";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { resetPassword, updatePassword } from "../../global/api";
import { useLocation } from "react-router-dom";
function PasswordReset() {
  const newPassword = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const submitReset = async function () {
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
  const submitUpdate = async function () {
    const reqBody = {
      password: newPassword.current.value,
    };
    await updatePassword(JSON.stringify(reqBody))
      .then((res) => {
        navigate(`/profile/${res.data.profileName}`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

      <button onClick={location.state === null ? submitReset : submitUpdate}>
        Reset password
      </button>
    </Modal>
  );
}

export default PasswordReset;
