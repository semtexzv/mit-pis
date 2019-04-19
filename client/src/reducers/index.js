import LoginReducer from "./LoginReducer";
import * as C from "../constants";
import AuthReducer from "./AuthReducer";
import MeetingReducer from "./MeetingReducer";
import SpecializationReducer from "./SpecializationReducer";
import {combineReducers} from "redux-immutable";

export const rootReducer = combineReducers({
  [C.loginConstants.NAME]: LoginReducer,
  [C.authConstants.NAME]: AuthReducer,
  [C.meetingConstants.NAME]: MeetingReducer,
  [C.specializationConstants.NAME]: SpecializationReducer,
});
