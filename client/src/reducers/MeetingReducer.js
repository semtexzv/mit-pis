import {fromJS} from "immutable";
import { Map } from 'immutable';
import * as A from "../actions/MeetingActions";

const initialState = fromJS({
  meetingData: [
    {id: "1", date: "date1", name: "name1", surname: "surname1", title: "title1", brand: "brand1",
      customerInfo: "ci1", meetingInfo: "mi1"},
    {id: "2", date: "date2", name: "name2", surname: "surname2", title: "title2", brand: "brand2",
      customerInfo: "ci2", meetingInfo: "mi2"},
  ],
  selectedRow: [{}],
  displayDialog: false,
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
      // deleting row
      let mData = state.get("meetingData");
      const row_id = state.get("id");
      let newMeetingData = mData.delete(mData.findIndex(i => i.get("id") === row_id));
      let newState = state.set("meetingData", newMeetingData);
      // dialog shut
      newState = newState.set("displayDialog", false);
      // add new row
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
      newMeetingData = newState.get("meetingData").push(row);
      newState = newState.set("meetingData", newMeetingData);
      return newState;
    }
    case A.ADD_ROW: {
      let newState = state;

      //TODO: edit after saga will be added
      let randomID = Math.floor(Math.random() * 1000);
      newState = newState.set("id", randomID.toString());
      //!!!!

      newState = newState.set("date", "");
      newState = newState.set("name", "");
      newState = newState.set("surname", "");
      newState = newState.set("title", "");
      newState = newState.set("brand", "");
      newState = newState.set("customerInfo", "");
      newState = newState.set("meetingInfo", "");
      newState = newState.set("displayDialog", true);

      const row = Map({
        id: newState.get("id"),
        date: "",
        name: "",
        surname: "",
        title: "",
        brand: "",
        customerInfo: "",
        meetingInfo: "",
      });
      let newMeetingData = state.get("meetingData").push(row);
      newState = newState.set("meetingData", newMeetingData);
      return newState;
    }
    case A.TOGGLE_DISPLAY_DIALOG: {
      return state.get("displayDialog") ? state.set("displayDialog", false) :  state.set("displayDialog", true);
    }
    case A.UPDATE_SELECTED_ROW: {
      let data = action.value;
      let newState = state.set("selectedRow", data);
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

