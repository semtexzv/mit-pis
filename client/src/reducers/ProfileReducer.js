import {fromJS} from "immutable";
import * as A from "../actions/ProfileActions";

const initialState = fromJS({
  name: "",
  surname: "",
  userId: "",
  userName:"",
  passwordNew: "",
  passwordCheck: "",
  employee: null,
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
    case A.INIT_PROFILE: {
      const user = action.payload;

      return state.set("name", user.name)
        .set("changePassword", false)
        .set("surname", user.surname)
        .set("userId", user.id)
        .set("userName", user.username);
    }
    case A.SAVE_PROFILE: {
      const employee = {
        name: state.get("name"),
        surname: state.get("surname"),
        username: state.get("userName"),
        password: state.get("passwordNew")
      };

      return state.set("employee", employee);
    }
    default:
      return state;
  }
};

export default ProfileReducer;
