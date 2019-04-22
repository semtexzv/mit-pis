import {fromJS} from "immutable";
import * as A from "../actions/ProfileActions";

const initialState = fromJS({
  name: "",
  surname: "",
  userId: "",
  userName:"",
  passwordNew: "",
  passwordCheck: "",
  changePassword: false,
});

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.UPDATE_NAME: {
      return state.set("name", action.value);
    }
    case A.UPDATE_SURNAME: {
      return state.set("surname", action.value);
    }
    case A.UPDATE_USER_ID: {
      return state.set("userId", action.value);
    }
    case A.UPDATE_USER_NAME: {
      return state.set("userName", action.value);
    }
    case A.UPDATE_PASSWORD_NEW: {
      return state.set("passwordNew", action.value);
    }
    case A.UPDATE_PASSWORD_CHECK: {
      return state.set("passwordCheck", action.value);
    }
    case A.SET_CHANGE_PASSWORD: {
      return state.set("changePassword", true);
    }
    case A.UNSET_CHANGE_PASSWORD: {
      return state.set("changePassword", false);
    }
    case A.SAVE_PROFILE: {
      return state;
      //TODO: after this return, save name, surname and role. Also redirect to new site
    }
    default:
      return state;
  }
};

export default ProfileReducer;
