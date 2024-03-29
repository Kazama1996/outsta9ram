import Modal from "react-modal";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchFollower, fetchFollowing } from "../../../global/api";
import "../style/FollowerList.css";
import UserItem from "../../../component/UserItem";
function FollowerList(props) {
  const {
    followerList,
    setFollowerList,
    isOpenModal,
    setIsOpenModal,
    isFollower,
    userProfile,
  } = props;
  const [hasMore, sethasMore] = useState(true);
  const [pageNum, setPageNum] = useState(2);

  const closeModal = function () {
    setIsOpenModal(false);
    setFollowerList([]);
  };

  const getFollower = async function () {
    const res = await fetchFollower(userProfile.profileName, pageNum);
    const data = res.data;
    return data;
  };
  const getFollowing = async function () {
    const res = await fetchFollowing(userProfile.profileName, pageNum);
    const data = res.data;

    return data;
  };
  const fetchData = async function () {
    const dataFromServer = isFollower
      ? await getFollower()
      : await getFollowing();
    setFollowerList([...followerList, ...dataFromServer]);
    if (dataFromServer.length === 0 || dataFromServer.length < 20) {
      sethasMore(false);
    }
    setPageNum(pageNum + 1);
  };
  return (
    <Modal
      isOpen={isOpenModal}
      className="list-follower"
      ariaHideApp={false}
      overlayClassName="editor-post-overlay"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <InfiniteScroll
        dataLength={followerList.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading....</h4>}
        endMessage={<h4>End....</h4>}
      >
        {followerList.map((item) => {
          return <UserItem user={item} setDisplayUserList={setIsOpenModal} />;
        })}
      </InfiniteScroll>
    </Modal>
  );
}
export default FollowerList;
