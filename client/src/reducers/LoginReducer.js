import {fromJS} from "immutable";
import {UPDATE_LOGIN, UPDATE_PASSWORD} from "../actions/LoginActions";

const initialState = fromJS({
  password: "",
  login: "",
});

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD: {
      return state.set("password", action.value)
    }
    case UPDATE_LOGIN: {
      return state.set("login", action.value)
    }
    default:
      return state;
  }
};

export default LoginReducer;
