import {fromJS} from "immutable";
import { List } from 'immutable';
import * as A from "../actions/SpecializationActions";

const initialState = fromJS({
  employeeName: "",
  employeeSurname: "",
  chosenBrands: [], // aka specialization
  allBrands:[
    {id: "1", label: "Audi", value: "Audi"},
    {id: "2", label: "Lamborghini", value: "Lamborghini"},
    {id: "3", label: "Viper", value: "Viper"},
  ],
  allEmployees:[
    {id: "1", label: "Dezo Dorant", value: "Dezo Dorant"},
    {id: "2", label: "Rani Srani", value: "Rani Srani"},
    {id: "3", label: "Frank Enstein", value: "Frank Enstein"},
  ],
  warning: false,
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
      let randomID = getRandomInt(0, 3).toString();
      // simulate that employee haven't any specialization
      if(randomID === "0")
        return newState;
      //!!!

      let allBrands = newState.get("allBrands");
      // find brand with id === randomID
      let brand = allBrands.find(function(obj){return obj.get('id') === randomID;});
      // update chosenBrands
      let chosenBrands = newState.get("chosenBrands");
      chosenBrands = chosenBrands.push(brand.get("value"));
      newState = newState.set("chosenBrands", chosenBrands);
      return newState;
    }
    case A.SPEC_CHANGE: {
      return state.set("chosenBrands", List(action.value));
    }
    case A.UPDATE_EMPLOYEE_NAME: {
      return state.set("employeeName", action.value);
    }
    case A.UPDATE_EMPLOYEE_SURNAME: {
      return state.set("employeeSurname", action.value);
    }
    case A.SAVE_SPEC: {
      let newState = state;
      newState = newState.set("chosenBrands", List([]));
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
