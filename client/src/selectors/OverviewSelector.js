import {NAME} from "../constants/OverviewConstants";

const getModel = (state) => state.get(NAME);

export const getOverviewData = (state) => getModel(state).get("overviewData");
