import { useState } from "react";
import Modal from "react-modal";
import { searchUser } from "../global/api";
import UserItem from "./UserItem";
function SearchUser(props) {
  const { isDisplaySearch, setIsDisplaySearch } = props;
  const [userList, setUserList] = useState([]);
  const closeModal = function () {
    setIsDisplaySearch(false);
  };
  const handleSearch = async function (e) {
    setUserList([]);
    const res = await searchUser(e.target.value);
    setUserList(res.data);
  };
  return (
    <Modal
      isOpen={isDisplaySearch}
      ariaHideApp={false}
      overlayClassName="editor-post-overlay"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <input onChange={handleSearch}></input>
      {userList.map((item) => {
        return <UserItem user={item} setDisplayUserList={setIsDisplaySearch} />;
      })}
    </Modal>
  );
}
export default SearchUser;
