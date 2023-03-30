import { useRef } from "react";
import Modal from "react-modal";
import InputField from "../../component/InputField";
import { signup } from "../../global/api";
import { useNavigate } from "react-router-dom";
function Signup() {
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const profileName = useRef(null);
  const navigate = useNavigate();

  const submitSignup = async function () {
    const reqBody = {
      email: email.current.value,
      password: password.current.value,
      fullName: fullName.current.value,
      profileName: profileName.current.value,
    };
    await signup(JSON.stringify(reqBody))
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const redirectLogin = function () {
    navigate("/login");
  };

  return (
    <Modal isOpen={true} className="popupWindow-login" ariaHideApp={false}>
      <h2>Sign up for get the party started</h2>

      <div>
        <InputField type={"text"} placeholder={"Email"} reference={email} />
      </div>
      <div>
        <InputField
          type={"text"}
          placeholder={"fullName"}
          reference={fullName}
        />
      </div>
      <div>
        <InputField
          type={"text"}
          placeholder={"profileName"}
          reference={profileName}
        />
      </div>
      <div>
        <InputField
          type={"password"}
          placeholder={"Password"}
          reference={password}
        />
      </div>

      <button onClick={submitSignup}>Sign up</button>

      <div>
        <button onClick={redirectLogin}>Have account?</button>
      </div>
    </Modal>
  );
}

export default Signup;
