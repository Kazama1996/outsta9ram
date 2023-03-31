import Modal from "react-modal";
import "../style/SettingMenu.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../global/api";
function SettingMenu(props) {
  const { isDisplaySetting, setIsDisplaySetting } = props;
  const navigate = useNavigate();
  const closeModal = function () {
    setIsDisplaySetting(false);
  };
  const redirectEditProfile = function () {
    const profileName = window.location.pathname.split("/")[2];
    navigate(`/edit/${profileName}`, {
      state: { userProfile: props.userProfile },
    });
  };
  const redirectResetPwd = function () {
    navigate("/passwordReset", { state: { isLogin: true } });
  };
  const Logout = async function () {
    const res = await logout();
    navigate("/login");
  };
  return (
    <Modal
      isOpen={isDisplaySetting}
      className="menu-setting"
      ariaHideApp={false}
      overlayClassName="editor-post-overlay"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <div className="btns">
        <div onClick={redirectEditProfile}>Edit profile</div>
        <div onClick={redirectResetPwd}>Reset password</div>
        <div onClick={Logout}>Logout</div>
      </div>
    </Modal>
  );
}
export default SettingMenu;
