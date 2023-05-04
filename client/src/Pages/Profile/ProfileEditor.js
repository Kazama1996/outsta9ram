import "./style/ProfileEditor.css";
import InputField from "../../component/InputField";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import {
  createPost,
  getPreSignUrl,
  uploadImage,
  updateMe,
} from "../../global/api";
import { useNavigate } from "react-router-dom";
function ProfileEditor(props) {
  const location = useLocation();
  const [isDisplayAvatarPreview, setIsDisplayAvatarPreview] = useState(false);
  const signature = useRef(null);
  const profileName = useRef(null);
  const [preview, setPreview] = useState(location.state.userProfile.avatar);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const submitUpdate = async function () {
    let reqBody = {};
    if (signature.current.value !== "") {
      reqBody.signature = signature.current.value;
    }
    if (profileName.current.value !== "") {
      reqBody.profileName = profileName.current.value;
    }
    if (avatar !== null) {
      try {
        const {
          data: { KEY, clientUrl },
        } = await getPreSignUrl();
        await uploadImage(clientUrl, avatar);
        // reqbody add avatar .
        reqBody.avatar = KEY;
      } catch (err) {
        console.log(err);
      }
    }
    try {
      // call api updateMe
      const response = await updateMe(JSON.stringify(reqBody));
      navigate(`/profile/${response.data.profileName}`);
    } catch (err) {
      console.log(err);
    }
  };
  function handleFile(e) {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  }

  return (
    <div className="editor-container">
      <div>
        <img src={preview} className="avatar" />
        <label for="avatar">Choose a picture to update your avatar:</label>
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>
      <div>
        <InputField
          type={"text"}
          placeholder={"ProfileName"}
          reference={profileName}
        />
        <InputField
          type={"text"}
          placeholder={"How's going?"}
          reference={signature}
        />
      </div>
      <button onClick={submitUpdate}>submit</button>
    </div>
  );
}
export default ProfileEditor;

//<div className="btn-editavatar">edit your avatar</div>
