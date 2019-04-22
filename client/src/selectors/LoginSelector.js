import {NAME} from "../constants/LoginContants";

const getModel = (state) => state.get(NAME);

export const getLogin = (state) => getModel(state).get("login");
export const getPassword = (state) => getModel(state).get("password");
