import {fromJS} from "immutable";
import * as A from "../actions/ConnectEmployeeActions";

const initialState = fromJS({
  customerData: [],
  displayDialog: false,
  customerId: "",
  customerName: "",
  customerSurname: "",
  customerBrand: "",
  editedCustomer: null,

  // employee with specialization to brand "customerBrand"
  // value represents id of employee
  potentialEmployee: [],
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

      const customer = {
        assocEmployeeId: state.get("employeeId"),
      };

      newState = newState.set("editedCustomer", customer);

      newState = newState.set("displayDialog", false);
      return newState;
      //TODO: after this return, it must be reload customerData variable with corresponding Assigned column (probably yes value)
    }
    case A.SET_CONNECT_EMPLOYEE_DATA: {
      return state.set("potentialEmployee", fromJS(action.employees));
    }
    case A.SET_DATATABLE: {
      return state.set("customerData", fromJS(action.rows));
    }
    default:
      return state;
  }
};

export default ConnectEmployeeReducer;
