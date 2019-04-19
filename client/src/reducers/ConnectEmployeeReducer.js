import {fromJS} from "immutable";
import { List } from 'immutable';
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
      newState = newState.set("customerName", data.name);
      newState = newState.set("customerSurname", data.surname);
      newState = newState.set("customerBrand", data.brand);
      newState = newState.set("displayDialog", true);
      return newState;
    }
    case A.UPDATE_DROPDOWN: {
      let id = action.value;
      let newState = state;
      let potentialEmployee = newState.get("potentialEmployee");
      let row = potentialEmployee.find(function(obj){return obj.get('value') === id;});
      let name = row.get("label").split(" ");
      newState = newState.set("employeeId", id);
      return newState;
    }
    default:
      return state;
  }
};

export default ConnectEmployeeReducer;
