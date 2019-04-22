import {fromJS} from "immutable";
import * as A from "../actions/ProfileActions";

const initialState = fromJS({
  name: "",
  surname: "",
  role: "",
  userId: "",
  userName:"",
  roleList: [
    {label: "USER", value: "USER"},
    {label: "MANAGER", value: "MANAGER"},
    {label: "ADMIN", value: "ADMIN"},
    {label: "OWNER", value: "OWNER"},
  ],
});

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.UPDATE_NAME: {
      return state.set("name", action.value);
    }
    case A.UPDATE_SURNAME: {
      return state.set("surname", action.value);
    }
    case A.UPDATE_ROLE: {
      return state.set("role", action.value);
    }
    case A.UPDATE_USER_ID: {
      return state.set("userId", action.value);
    }
    case A.UPDATE_USER_NAME: {
      return state.set("userName", action.value);
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
