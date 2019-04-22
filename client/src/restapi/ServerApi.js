const BASE_URL = "http://localhost:8080/api"

export const LOGIN_URL = BASE_URL + "/login";
export const EMPLOYEES_URL = BASE_URL + "/employee";
export const BRANDS_URL = BASE_URL + "/brand";
export const CUSTOMERS_URL = BASE_URL + "/customer";
export const SPECIALIZATION_URL = BASE_URL + "/specialization";
export const SPECIALIZATION_LIST_URL = SPECIALIZATION_URL + "/addList";
export const ME_URL = BASE_URL + "/me";

export const getUsersUrl = (id) => EMPLOYEES_URL + "/" + id;
export const getUsersMeetingsUrl = (id) => getUsersUrl(id) + "/meetings";

export const REGISTER_URL = BASE_URL + "/register";

export const CREATE_MEETING_URL = BASE_URL + "/meeting";
export const getUpdateMeetingUrl = (id) => CREATE_MEETING_URL + "/" + id;
export const getUpdateCustomerUrl = (id) => CUSTOMERS_URL + "/" + id;

