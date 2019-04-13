import { combineReducers } from 'redux'
import LoginReducer from "./LoginReducer";
import TopMenuReducer from "./TopMenuReducer";
export const rootReducer = combineReducers({
  state: LoginReducer, menu_state: TopMenuReducer
});
