import instance from "./axiosInstance";
const customConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const signup = function (data) {
  return instance.post("/api/v1/auth/signup", data, customConfig);
};
export const login = function (data) {
  return instance.post("/api/v1/auth/login", data, customConfig);
};
export const logout = function () {
  return instance.get("/api/v1/auth/logout", customConfig);
};
export const forgotPassword = function (data) {
  return instance.post("/api/v1/auth/forgotPassword", data, customConfig);
};
export const getPreSignUrl = function () {
  return instance.get("/api/v1/posts/presign-url", customConfig);
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
  return instance.post("/api/v1/posts", data, customConfig);
};

export const protect = async function () {
  return instance.get("/api/v1/auth/route-protection", customConfig);
};
export const getUserProfile = function (profileName) {
  return instance.get(`/api/v1/profiles/${profileName}`, customConfig);
};
export const getPostAttribute = function (postId) {
  return instance.get(`/api/v1/posts/${postId}`, customConfig);
};
export const getComment = function (postId) {
  return instance.get(`/api/v1/comments/${postId}`, customConfig);
};

export const likePost = function (postId) {
  return instance.post(`/api/v1/likes/${postId}`, customConfig);
};
export const cancelLike = function (postId) {
  return instance.delete(`/api/v1/likes/${postId}`, customConfig);
};

export const createComment = function (data) {
  return instance.post("/api/v1/comments", data, customConfig);
};

export const resetPassword = function (data) {
  return instance.patch("/api/v1/auth/reset-password", data, customConfig);
};
export const updatePassword = function (data) {
  return instance.patch("/api/v1/profiles/update-password", data, customConfig);
};
export const updateMe = function (data) {
  return instance.patch("/api/v1/users", data, customConfig);
};

export const fetchFollower = function (profileName, pageNum) {
  return instance.get(
    `/api/v1/followers/${profileName}/${pageNum}`,
    customConfig
  );
};

export const fetchFollowing = function (profileName, pageNum) {
  return instance.get(
    `/api/v1/following/${profileName}/${pageNum}`,
    customConfig
  );
};

export const followUser = function (prifileName, pageNum) {
  return instance.post(
    `/api/v1/followers/${prifileName}/${pageNum}`,
    customConfig
  );
};

export const unfollowUser = function (prifileName, pageNum) {
  return instance.delete(
    `/api/v1/followers/${prifileName}/${pageNum}`,
    customConfig
  );
};

export const searchUser = function (profileName) {
  return instance.get(`/api/v1/users/${profileName}`, customConfig);
};
