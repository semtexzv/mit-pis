import {NAME} from "../constants/AuthConstants";

const getModel = (state) => state.get(NAME);

export const getAuthToken = (state) => getModel(state).get("token");
export const getMyCustomers = (state) => getModel(state).getIn(["user", "customers"]);
export const getLoggedUserId = (state) => getModel(state).getIn(["user", "id"]);
export const getMyRole = (state) => getModel(state).getIn(["user", "sysRole"]);
export const getLogged = (state) => getModel(state).get("logged");
export const getLastActiveTime = (state) => getModel(state).get("lastActiveTime");
