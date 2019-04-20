import {fromJS} from "immutable";
import * as A from "../actions/ProfileActions";


const initialState = fromJS({
  name: "",
  surname: "",
  role: "",
  roleList: [
    {label: "USER", value: "1"},
    {label: "MANAGER", value: "2"},
    {label: "ADMIN", value: "3"},
    {label: "OWNER", value: "4"},
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
    case A.SAVE_PROFILE: {
      return state;
      //TODO: after this return, save name, surname and role. Also redirect to new site
    }
    default:
      return state;
  }
};

export default ProfileReducer;
