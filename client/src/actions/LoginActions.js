import {NAME} from "../constants/LoginContants";

export const UPDATE_PASSWORD = `${NAME}/UPDATE_PASSWORD`;
export const UPDATE_LOGIN = `${NAME}/UPDATE_LOGIN`;
export const LOGIN = `${NAME}/LOGIN`;
export const LOGGED = `${NAME}/LOGGED`;

export const updatePassword = (value) => ({
  type: UPDATE_PASSWORD,
  value: value
});

export const updateLogin = (value) => ({
  type: UPDATE_LOGIN,
  value: value
});

export const logToSystem = (login, password) => ({
  type: LOGIN,
  login: login,
  password: password,
});

export const loggedToSystem = (login, status) => ({
  type: LOGGED,
  login: login,
  status: status
});
