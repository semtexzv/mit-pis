import {NAME} from "../constants/LoginContants";

export const UPDATE_PASSWORD = `${NAME}/UPDATE_PASSWORD`;
export const UPDATE_LOGIN = `${NAME}/UPDATE_LOGIN`;
export const LOGIN = `${NAME}/LOGIN`;

export const updatePassword = (value) => ({
  type: UPDATE_PASSWORD,
  value: value
});

export const updateLogin = (value) => ({
  type: UPDATE_LOGIN,
  value: value
});

export const login = () => ({
  type: LOGIN,
});
