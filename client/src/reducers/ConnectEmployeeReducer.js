import {fromJS} from "immutable";
import * as A from "../actions/ConnectEmployeeActions";

const initialState = fromJS({
  customerData: [
    {id: "1", name: "Abraham", surname: "Lincoln", brand: "Ford", assigned: "yes"},
    {id: "2", name: "Thomas", surname: "Jefferson", brand: "Fiat", assigned: "no"},
  ],
  displayDialog: false,
  customerId: "",
  customerName: "",
  customerSurname: "",
  customerBrand: "",

  // employee with specialization to brand "customerBrand"
  // value represents id of employee
  potentialEmployee: [
    {label: "Amadeus Mozart", value: "1"},
    {label: "Johann Bach", value: "2"},
  ],
  employeeId: "",
});

const ConnectEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.TOGGLE_DISPLAY_DIALOG: {
      return state.get("displayDialog") ? state.set("displayDialog", false) :  state.set("displayDialog", true);
    }
    case A.UPDATE_SELECTED_ROW: {
      let data = action.value;
      let newState = state;
      newState = newState.set("customerId", data.id);
      newState = newState.set("employeeId", "");
      newState = newState.set("customerName", data.name);
      newState = newState.set("customerSurname", data.surname);
      newState = newState.set("customerBrand", data.brand);
      newState = newState.set("displayDialog", true);
      return newState;
      //TODO: after this return, set employeeId to appropriate id by customerId
    }
    case A.UPDATE_DROPDOWN: {
      return state.set("employeeId", action.value);
    }
    case A.SAVE_ROW: {
      let newState = state;
      newState = newState.set("displayDialog", false);
      return newState;
      //TODO: after this return, it must be reload customerData variable with corresponding Assigned column (probably yes value)
    }
    default:
      return state;
  }
};

export default ConnectEmployeeReducer;
