import {fromJS} from "immutable";
import {SET_AUTH, SET_LAST_ROUTE_TIME, SET_USER} from "../actions/AuthActions";

const initialState = fromJS({
  token: "",
  logged: false,
  user: null,
  lastActiveTime: null,
});

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      return state
        .set("token", action.payload)
        .set("logged", true)
        .set("lastActiveTime", new Date().getTime());
    }
    case SET_USER:
      return state
        .set("user", action.payload);
    case SET_LAST_ROUTE_TIME:
      return state
        .set("lastActiveTime", action.payload);
    case SET_USER:
      return state
        .set("user", action.payload);
    default:
      return state;
  }
};

export default authReducer;
