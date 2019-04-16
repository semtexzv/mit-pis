import LoginReducer from "./LoginReducer";
import * as C from "../constants";
import AuthReducer from "./AuthReducer";
import MeetingReducer from "./MeetingReducer";
import {combineReducers} from "redux-immutable";
import RegisterReducer from "./RegisterReducer";

export const rootReducer = combineReducers({
  [C.registerConstants.NAME]: RegisterReducer,
  [C.loginConstants.NAME]: LoginReducer,
  [C.authConstants.NAME]: AuthReducer,
  [C.meetingConstants.NAME]: MeetingReducer,
});
