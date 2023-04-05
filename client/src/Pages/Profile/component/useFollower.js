import { getFollowers } from "../../../global/api";
function useFollower(profileName, pageNumber) {
  useEffect(() => {
    getFollowers(profileName, pageNumber).then((res) => {});
  }, [pageNumber]);
  return;
}
