import { LOGIN, LOGOUT } from "./types";
import axiosWrapper from "../../../../apis/axiosCreate";
export const login = object => {
  return {
    type: LOGIN,
    payload: object
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: null
  };
};

export const createUser = userDetails => async () => {
  await axiosWrapper.post(`/users`, userDetails);
};
