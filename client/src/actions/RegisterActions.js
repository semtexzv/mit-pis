import {UPDATE_LOGIN, UPDATE_PASSWORD} from "./LoginActions";

export const updatePassword = (value) => ({
  type: UPDATE_PASSWORD,
  value: value
});

export const updateLogin = (value) => ({
  type: UPDATE_LOGIN,
  value: value
});
