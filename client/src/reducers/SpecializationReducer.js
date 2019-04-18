import {fromJS} from "immutable";
import * as A from "../actions/SpecializationActions";

const initialState = fromJS({
  //specializationId: "",
  //employeeId: "",
  //brandId: "",
  employeeName: "",
  employeeSurname: "",
  chosenBrands: [], // aka specialization
  allBrands:[
    {label: "Audi", value: "Audi"},
    {label: "Lamborghini", value: "Lamborghini"},
    {label: "Viper", value: "Viper"},
  ],
  allEmployees:[
    {label: "Dezo Dorant", value: "Dezo Dorant"},
    {label: "Rani Srani", value: "Rani Srani"},
    {label: "Frank Enstein", value: "Frank Enstein"},
  ],
  warning: false,
});

const SpecializationReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.SPEC_CHANGE: {
      return state.set("chosenBrands", action.value);
    }
    case A.UPDATE_EMPLOYEE_NAME: {
      return state.set("employeeName", action.value);
    }
    case A.UPDATE_EMPLOYEE_SURNAME: {
      return state.set("employeeSurname", action.value);
    }
    case A.SAVE_SPEC: {
      let newState = state;
      newState = newState.set("chosenBrands", []);
      newState = newState.set("employeeName", "");
      newState = newState.set("employeeSurname", "");
      return newState;
    }
    case A.SHOW_WARNING: {
      return state.set("warning", true);
    }
    case A.HIDE_WARNING: {
      return state.set("warning", false);
    }
    default:
      return state;
  }
};

export default SpecializationReducer;
