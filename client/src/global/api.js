import instance from "./axiosInstance";
const customConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const signup = function (data) {
  return instance.post("signup", data, customConfig);
};
export const login = function (data) {
  return instance.post("login", data, customConfig);
};

export const getPreSignUrl = function () {
  return instance.get("/api/preSignUrl", customConfig);
};

export const uploadImage = function (preSignUrl, file) {
  return instance.put(preSignUrl, file, {
    headers: {
      "Content-Type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const createPost = function (data) {
  return instance.post("/api/post", data, customConfig);
};

export const protect = async function () {
  return instance.get("/api/protectRoute", customConfig);
};
export const getUserProfile = function (user) {
  return instance.get(`/api/${user}`, customConfig);
};
export const getPostAttribute = function (postId) {
  return instance.get(`/api/p/${postId}`, customConfig);
};
