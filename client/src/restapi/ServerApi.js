const BASE_URL = "http://localhost:8080/api"

export const LOGIN_URL = BASE_URL + "/login";
export const EMPLOYEES_URL = BASE_URL + "/employee";
export const ME_URL = BASE_URL + "/me";

export const getUsersUrl = (id) => EMPLOYEES_URL + "/" + id;

