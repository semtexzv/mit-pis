import { combineReducers } from 'redux'
import LoginReducer from "./LoginReducer";
export const rootReducer = combineReducers({
  state: LoginReducer
});
