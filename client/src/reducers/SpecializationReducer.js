import {fromJS} from "immutable";
import { List } from 'immutable';
import * as A from "../actions/SpecializationActions";

const initialState = fromJS({

  employeeId: "", // chosen employee
  chosenBrands: [], // aka specializations
  // value represent brand id
  allBrands:[],
  // value represent employee id
  allEmployees:[],
  warning: false, // show warning
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SpecializationReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.FILL_SPEC: {
      let newState = state;
      // User choose new employee, so remove all in chosenBrands
      newState = newState.set("chosenBrands", List([]));

      // this is only example. It doesn't truly reflect database
      //TODO: edit after saga will be added
      // simulate that employee has some specializations
      let randomID = getRandomInt(0, 3).toString();
      // simulate that employee haven't any specialization
      if(randomID === "0")
        return newState;
      //!!!

      let allBrands = newState.get("allBrands");
      // find brand with id === randomID
      let brand = allBrands.find(function(obj){return obj.get('value') === randomID;});
      // update chosenBrands
      let chosenBrands = newState.get("chosenBrands");
      chosenBrands = chosenBrands.push(brand.get("value"));
      newState = newState.set("chosenBrands", chosenBrands);
      return newState;
    }
    case A.SET_SPECIALIZATION_DATA: {
      return state
        .set("allBrands", fromJS(action.brands))
        .set("allEmployees", fromJS(action.employees));
    }
    case A.SPEC_CHANGE: {
      return state.set("chosenBrands", List(action.value));
    }
    case A.UPDATE_DROPDOWN: {
      return state.set("employeeId", action.value);
    }
    case A.SAVE_SPEC: {
      let newState = state;
      newState = newState.set("chosenBrands", List([]));
      newState = newState.set("employeeId", "");
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
