import {NAME} from "../constants/ProfileConstants";

const getModel = (state) => state.get(NAME);

export const getName = (state) => getModel(state).get("name");
export const getSurname = (state) => getModel(state).get("surname");
export const getUsername = (state) => getModel(state).get("userName");
export const getPasswordNew = (state) => getModel(state).get("passwordNew");
export const getPasswordCheck = (state) => getModel(state).get("passwordCheck");
export const getChangePassword = (state) => getModel(state).get("changePassword");
export const getUserId = (state) => getModel(state).get("userId");

