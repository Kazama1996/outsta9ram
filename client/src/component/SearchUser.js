import { useState } from "react";
import Modal from "react-modal";
import { searchUser } from "../global/api";
import UserItem from "./UserItem";
import "./style/SearchUser.css";
function SearchUser(props) {
  const { isDisplaySearch, setIsDisplaySearch, userList, setUserList } = props;

  const closeModal = function () {
    setIsDisplaySearch(false);
  };
  const handleSearch = async function (e) {
    if (e.target.value !== "") {
      setUserList([]);
      const res = await searchUser(e.target.value);
      setUserList(res.data);
    }
  };
  return (
    <Modal
      isOpen={isDisplaySearch}
      ariaHideApp={false}
      className="modal-search"
      overlayClassName="editor-post-overlay"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <input onChange={handleSearch}></input>
      {userList.map((item) => {
        return (
          <div>
            <UserItem user={item} setDisplayUserList={setIsDisplaySearch} />
          </div>
        );
      })}
    </Modal>
  );
}
export default SearchUser;
