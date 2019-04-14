import {NAME} from "../constants/AuthConstants";

export const SET_AUTH = `${NAME}/SET_AUTH`;

export const setAuth = (token) => ({
  type: SET_AUTH,
  payload: token,
});
