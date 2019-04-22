import {NAME} from "../constants/AuthConstants";

export const SET_AUTH = `${NAME}/SET_AUTH`;
export const SET_USER = `${NAME}/SET_USER`;
export const SET_LAST_ROUTE_TIME = `${NAME}/SET_LAST_ROUTE_TIME`;
export const LOGOUT = `${NAME}/LOGOUT`;
export const LOGOUT_FROM_SERVER = `${NAME}/LOGOUT_FROM_SERVER`;

export const setAuth = (token) => ({
  type: SET_AUTH,
  payload: token,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setLasteouteTime = (time) => ({
  type: SET_LAST_ROUTE_TIME,
  payload: time,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutFromServer = () => ({
  type: LOGOUT_FROM_SERVER,
});
