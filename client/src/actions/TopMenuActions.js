import {NAME} from "../constants/TopMenuConstants";

export const UPDATE_WINDOW = `${NAME}/UPDATE_WINDOW`;
export const UPDATE_MENU_ITEM = `${NAME}/UPDATE_MENU_ITEM`;

export const updateWindow = (value) => ({
  type: UPDATE_WINDOW,
  value: value
});

export const updateMenuItem = (value) => ({
  type: UPDATE_MENU_ITEM,
  value: value
});
