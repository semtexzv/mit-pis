import {fromJS} from "immutable";
import {UPDATE_WINDOW, UPDATE_MENU_ITEM} from "../actions/TopMenuActions";

const initialState = fromJS({
  window: "",
  menu_item: "",
});

const TopMenuReducer = (menu_state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WINDOW: {
      return menu_state.set("window", action.value)
    }
    case UPDATE_MENU_ITEM: {
      return menu_state.set("menu_item", action.value)
    }
    default:
      return menu_state;
  }
};

export default TopMenuReducer;
