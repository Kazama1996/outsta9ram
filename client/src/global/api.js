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

export const protect = function (data) {
  return instance.get("protect", data, customConfig);
};
