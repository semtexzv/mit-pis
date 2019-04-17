import {fromJS} from "immutable";
import { Map } from 'immutable';
import * as A from "../actions/MeetingActions";

const initialState = fromJS({
  meetingData: [
    {id: "1", date: "2019-04-17T18:57:16.000Z", name: "Al", surname: "Koholik", title: "title1", brand: "brand1",
      customerInfo: "ci1", meetingInfo: "mi1"},
    {id: "2", date: "2019-04-17T12:00:00.000Z", name: "Lojza", surname: "Dozdichcal", title: "title2", brand: "brand2",
      customerInfo: "ci2", meetingInfo: "mi2"},
  ],
  allCustomers: [
    {label: "Al Koholik", value: "Al Koholik"},
    {label: "Lojza Dozdichcal", value: "Lojza Dozdichcal"}
  ],
  displayDialog: false,
  addButton: false,
  id: "",
  date: "",
  name: "",
  surname: "",
  title: "",
  brand: "",
  customerInfo: "",
  meetingInfo: "",
});

const MeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case A.DELETE_ROW: {
      let mData = state.get("meetingData");
      const row_id = state.get("id");
      let newMeetingData = mData.delete(mData.findIndex(i => i.get("id") === row_id));
      let newState = state.set("meetingData", newMeetingData);
      newState = newState.set("displayDialog", false);
      return newState;
    }
    case A.SAVE_ROW: {
      var newState = state;
      if(state.get("addButton") === false) {
        // editing row => delete old record
        let mData = state.get("meetingData");
        const row_id = state.get("id");
        let newMeetingData = mData.delete(mData.findIndex(i => i.get("id") === row_id));
        newState = state.set("meetingData", newMeetingData);
      }
      else{
        // add new row => for this example it must be create new ID number
        //TODO: edit after saga will be added
        let randomID = Math.floor(Math.random() * 1000);
        newState = newState.set("id", randomID.toString());
        //!!!
        newState = newState.set("addButton", false);
      }
      // dialog shut
      newState = newState.set("displayDialog", false);
      // create new row
      const row = Map({
        id: state.get("id"),
        date: state.get("date"),
        name: state.get("name"),
        surname: state.get("surname"),
        title: state.get("title"),
        brand: state.get("brand"),
        customerInfo: state.get("customerInfo"),
        meetingInfo: state.get("meetingInfo"),
      });
      // add new row to dataTable
      let newMeetingData = newState.get("meetingData").push(row);
      newState = newState.set("meetingData", newMeetingData);
      return newState;
    }
    case A.SET_ADD_BUTTON: {
      let newState = state;
      newState = newState.set("date", "");
      newState = newState.set("name", "");
      newState = newState.set("surname", "");
      newState = newState.set("title", "");
      newState = newState.set("brand", "");
      newState = newState.set("customerInfo", "");
      newState = newState.set("meetingInfo", "");
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
    case A.UPDATE_SELECTED_ROW: {
      let data = action.value;
      let newState = state;
      newState = newState.set("id", data.id);
      newState = newState.set("date", data.date);
      newState = newState.set("name", data.name);
      newState = newState.set("surname", data.surname);
      newState = newState.set("title", data.title);
      newState = newState.set("brand", data.brand);
      newState = newState.set("customerInfo", data.customerInfo);
      newState = newState.set("meetingInfo", data.meetingInfo);
      newState = newState.set("displayDialog", true);
      return newState;
    }
    case A.UPDATE_DATE: {
      return state.set("date", action.value)
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
    case A.UPDATE_CUSTOMER_INFO: {
      return state.set("customerInfo", action.value)
    }
    case A.UPDATE_MEETING_INFO: {
      return state.set("meetingInfo", action.value)
    }
    default:
      return state;
  }
};

export default MeetingReducer;

