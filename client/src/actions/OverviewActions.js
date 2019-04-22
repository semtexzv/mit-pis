import {NAME} from "../constants/OverviewConstants";

export const INIT_OVERVIEW = `${NAME}/INIT_OVERVIEW`;
export const UPDATE_OVERVIEW_DATA = `${NAME}/UPDATE_OVERVIEW_DATA`;


export const initOverview = () => ({
  type: INIT_OVERVIEW,
});

export const updateOverviewData = (rows) => ({
  type: UPDATE_OVERVIEW_DATA,
  payload: rows
});
