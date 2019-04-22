import {NAME} from "../constants/AuthConstants";

export const SET_AUTH = `${NAME}/SET_AUTH`;
export const SET_USER = `${NAME}/SET_USER`;

export const setAuth = (token) => ({
  type: SET_AUTH,
  payload: token,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
