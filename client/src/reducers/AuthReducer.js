import {fromJS} from "immutable";
import {SET_AUTH, SET_USER} from "../actions/AuthActions";

const initialState = fromJS({
  token: "",
  logged: false,
  user: null,
});

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return state
        .set("token", action.payload)
        .set("logged", true);
    case SET_USER:
      return state
        .set("user", action.payload);
    default:
      return state;
  }
};

export default authReducer;
