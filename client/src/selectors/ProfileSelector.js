import {NAME} from "../constants/ProfileConstants";

const getModel = (state) => state.get(NAME);

export const getName = (state) => getModel(state).get("name");
export const getSurname = (state) => getModel(state).get("surname");
export const getRole = (state) => getModel(state).get("role");
export const getRoleList = (state) => getModel(state).get("roleList");
