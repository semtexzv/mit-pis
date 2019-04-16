import {NAME} from "../constants/RegisterConstants";

export const UPDATE_PASSWORD = `${NAME}/UPDATE_PASSWORD`;
export const UPDATE_LOGIN = `${NAME}/UPDATE_LOGIN`;
export const REGISTER = `${NAME}/REGISTER`;

export const updatePassword = (value) => ({
  type: UPDATE_PASSWORD,
  value: value
});

export const updateLogin = (value) => ({
  type: UPDATE_LOGIN,
  value: value
});

export const registerToSystem = (login, password) => ({
  type: REGISTER,
  login: login,
  password: password,
});
