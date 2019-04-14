import {NAME} from "../constants/AuthConstants";

const getModel = (state) => state.get(NAME);

export const getAuthToken = (state) => getModel(state).get("token");
