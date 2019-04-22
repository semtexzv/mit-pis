import {fromJS} from "immutable";
import {UPDATE_OVERVIEW_DATA} from "../actions/OverviewActions";

const initialState = fromJS({
  overviewData:[]
});


const OverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OVERVIEW_DATA: {
      return state.set("overviewData", fromJS(action.payload));
    }
    default:
      return state;
  }
};

export default OverviewReducer;
