import {fromJS} from "immutable";

const initialState = fromJS({
  overviewData:[
    {customerName: "A", customerSurname: "B",
     employeeName: "C", employeeSurname: "D",
     brand: "E", date: "2019-04-17T18:45:00.000Z"}
  ]
});


const OverviewReducer = (state = initialState, action) => {
  return state;
};

export default OverviewReducer;
