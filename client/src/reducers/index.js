import LoginReducer from "./LoginReducer";
import {loginConstants, authConstants} from "../constants";
import AuthReducer from "./AuthReducer";
import {combineReducers} from "redux-immutable";

export const rootReducer = combineReducers({
  [loginConstants.NAME]: LoginReducer,
  [authConstants.NAME]: AuthReducer
});
