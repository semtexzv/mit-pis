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


      let allBrands = newState.get("allBrands");
      let chosenBrands = newState.get("chosenBrands");
      // find brand with id === randomID
      action.payload.forEach(
        (brand) => {
          let brandToPush = allBrands.find(function(obj){return obj.get('value') === brand.id;});
          chosenBrands = chosenBrands.push(brandToPush.get("value"));
        }
      );
      // update chosenBrands
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
