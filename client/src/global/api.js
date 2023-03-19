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

export const createPost = async function (data) {
  return instance.get("/api/upload", customConfig);
};

export const protect = async function () {
  return instance.get("/api/protect", customConfig);
};
