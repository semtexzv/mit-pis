import {fromJS} from "immutable";
import * as A from "../actions/CustomerActions";

const initialState = fromJS({
  customerData:[],
  id: "",
  name: "",
  surname: "",
  title: "",
  brand: "",
  info: "",
  displayDialog: false,
  addButton: false,
  customer: null,
  create: false,
});

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.DELETE_ROW: {
      return state.set("displayDialog", false);
      //TODO: after this return, delete customer by "id" and reload "cutomerData"
    }
    case A.SAVE_ROW: {

      const customer = {
        name: state.get("name"),
        surname: state.get("surname"),
        title: state.get("title"),
        brandId: state.get("brand"),
        info: state.get("info")
      };

      let created = state.get("addButton");

      return state
        .set("displayDialog", false)
        .set("addButton", false)
        .set("customer", customer)
        .set("create", created);

      //TODO: after this return, save properties and reload "cutomerData"
    }
    case A.UPDATE_SELECTED_ROW: {
      let data = action.value;
      let newState = state;
      newState = newState.set("id", data.id);
      newState = newState.set("name", data.name);
      newState = newState.set("surname", data.surname);
      newState = newState.set("title", data.title);
      newState = newState.set("brand", data.brand);
      newState = newState.set("info", data.info);
      newState = newState.set("displayDialog", true);
      return newState;
    }
    case A.SET_ADD_BUTTON: {
      let newState = state;
      newState = newState.set("id", "");
      newState = newState.set("name", "");
      newState = newState.set("surname", "");
      newState = newState.set("title", "");
      newState = newState.set("brand", "");
      newState = newState.set("info", "");
      newState = newState.set("displayDialog", true);
      newState = newState.set("addButton", true);
      return newState;
    }
    case A.UNSET_ADD_BUTTON:{
      return state.set("addButton", false);
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
    case A.UPDATE_TITLE: {
      return state.set("title", action.value)
    }
    case A.UPDATE_BRAND: {
      return state.set("brand", action.value)
    }
    case A.UPDATE_INFO: {
      return state.set("info", action.value)
    }case A.SET_CUSTOMERS: {
      return state.set("customerData", fromJS(action.payload));
    }
    default:
      return state;
  }
};

export default CustomerReducer;

