import {NAME} from "../constants/RegisterConstants";

const getModel = (state) => state.get(NAME);

export const getLogin = (state) => getModel(state).get("login");
export const getPassword = (state) => getModel(state).get("password");
