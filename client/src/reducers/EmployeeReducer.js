import {fromJS} from "immutable";
import * as A from "../actions/EmployeeActions";

const initialState = fromJS({
  employeeData:[
    {id: "1", name: "Vaclav", surname: "Nesnidal", role: "USER"},
  ],
  roleList: [
    {label: "USER", value: "1"},
    {label: "MANAGER", value: "2"},
    {label: "ADMIN", value: "3"},
    {label: "OWNER", value: "4"},
  ],
  id: "",
  name: "",
  surname: "",
  role: "", //id of role => 1,2,3,4
  changePassword: false, // true if user want to change password
  passwordOld: "", // old user password
  passwordOld_fromBE: "admin", // old password from loaded database TODO: security back door, at final version change it!
  passwordNew: "", // new user password
  passwordCheck: "", // new user password once more for check
  displayDialog: false,
});

function getRoleId(state, name){
  let roleList = state.get("roleList");
  let row = roleList.find(function(obj){return obj.get('label') === name;});
  return row.get("value");
}

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.DELETE_ROW: {
      return state.set("displayDialog", false);
      //TODO: after this return, delete employee by "id" and reload "empoyeeData"
    }
    case A.SAVE_ROW: {
      let newState = state;
      newState =  newState.set("displayDialog", false);
      newState =  newState.set("changePassword", false);
      return newState;
      //TODO: after this return, save properties and reload "employeeData"
      //  Warning: "role" is a number -> id
    }
    case A.UPDATE_SELECTED_ROW: {
      let data = action.value;
      let newState = state;
      newState = newState.set("id", data.id);
      newState = newState.set("name", data.name);
      newState = newState.set("surname", data.surname);
      newState = newState.set("role", getRoleId(state, data.role));
      newState = newState.set("displayDialog", true);
      return newState;
    }
    case A.TOGGLE_DISPLAY_DIALOG: {
      return state.get("displayDialog") ? state.set("displayDialog", false) :  state.set("displayDialog", true);
    }
    case A.UPDATE_NAME: {
      return state.set("name", action.value)
    }
    case A.UPDATE_SURNAME: {
      return state.set("surname", action.value)
    }
    case A.UPDATE_ROLE: {
      return state.set("role", action.value)
    }
    case A.SET_CHANGE_PASSWORD: {
      return state.set("changePassword", true);
    }
    case A.UNSET_CHANGE_PASSWORD: {
      return state.set("changePassword", false);
    }
    case A.UPDATE_PASSWORD_OLD: {
      return state.set("passwordOld", action.value)
    }
    case A.UPDATE_PASSWORD_OLD_FROM_BE: {
      return state.set("passwordOld_fromBE", action.value)
    }
    case A.UPDATE_PASSWORD_NEW: {
      return state.set("passwordNew", action.value)
    }
    case A.UPDATE_PASSWORD_CHECK: {
      return state.set("passwordCheck", action.value)
    }
    default:
      return state;
  }
};

export default EmployeeReducer;
