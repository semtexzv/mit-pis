import {fromJS} from "immutable";
import {SET_AUTH} from "../actions/AuthActions";

const initialState = fromJS({
  token: "",
  logged: false
});

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return state
        .set("token", action.payload)
        .set("logged", true);
    default:
      return state;
  }
};

export default authReducer;
