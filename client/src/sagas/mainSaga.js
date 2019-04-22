import {call, put, takeEvery, select, takeLatest} from "redux-saga/effects";
import {LOGIN} from "../actions/LoginActions";
import {REGISTER} from "../actions/RegisterActions";
import * as superagent from "superagent/dist/superagent";
import {getAuthToken, getLoggedUserId, getMyCustomers} from "../selectors/AuthSelector";
import {
  BRANDS_URL,
  MEETING_URL, CUSTOMERS_URL, EMPLOYEES_URL, getUpdateCustomerUrl, getUpdateMeetingUrl, getUsersMeetingsUrl, getUsersUrl, LOGIN_URL,
  ME_URL, REGISTER_URL, SPECIALIZATION_LIST_URL,
  SPECIALIZATION_URL,
  getUpdateEmployeeUrl, getPasswordAdminUrl,
} from "../restapi/ServerApi";
import {setAuth, setUser} from "../actions/AuthActions";
import history from '../utils/history'
import {DELETE_ROW, INIT_DATA, initData, SAVE_ROW, setCustomers, setMeetings} from "../actions/MeetingActions";
import {
  transformBrands, transformConnectedEmployees, transformCustomers, transformEmployees, transformEmployees2, transformMeetings, transformToOverViewRows,
  transformUserProfileToJSON,
  transformUsersSpecializations,
  transformUsersSpecializationsToJSON
} from "../utils/transformUtils";
import {getCreateStatus, getMeetingId, getRow} from "../selectors/MeetingSelector";
import {fillSpec, INIT_SPECIALIZATION_DATA, SAVE_SPEC, setSpecializationData, UPDATE_DROPDOWN} from "../actions/SpecializationActions";
import {INIT_CONNECT_EMPLOYEE_DATA, initConnectEmployeeData, setDataTable, setEmployyesData} from "../actions/ConnectEmployeeActions";

import * as CEA from "../actions/ConnectEmployeeActions";
import {getCustomerId, getEditedCustomer, getEmployeeId} from "../selectors/ConnectEmployeeSelector";
import * as SS from "../selectors/SpecializationSelector";
import * as PS from "../selectors/ProfileSelector"
import {INIT_OVERVIEW, updateOverviewData} from "../actions/OverviewActions";
import {SAVE_PROFILE, updateName, updateRole, updateSurname, updateUserId, updateUserName} from "../actions/ProfileActions";

// EmployeeContainer
import * as ECA from "../actions/EmployeeActions"
import * as ECS from "../selectors/EmployeeSelector"

export default function* mainSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(REGISTER, registerSaga);
  yield takeEvery(SAVE_PROFILE, updateProfileSaga);
  yield takeEvery(SAVE_ROW, meetingSaga);
  yield takeEvery(DELETE_ROW, deleteMeetingSaga);
  yield takeLatest(INIT_SPECIALIZATION_DATA, initSpecializations);
  yield takeLatest(INIT_CONNECT_EMPLOYEE_DATA, initConnectedEmployeeData);
  yield takeLatest(INIT_DATA, meetingsSaga);
  yield takeLatest(UPDATE_DROPDOWN, selectedSpecializationsSaga);
  yield takeEvery(CEA.SAVE_ROW, updateAssociatedEmployeeSaga);
  yield takeEvery(SAVE_SPEC, updateSpecializationSaga);
  yield takeLatest(INIT_OVERVIEW, initOverViewSaga);
  // EmployeeContainer
  yield takeLatest(ECA.INIT_EMPLOYEE_DATA, initEmployeeData);
  yield takeEvery(ECA.SAVE_ROW, saveEmployeeRow);
  //yield takeEvery(ECA.UPDATE_SELECTED_ROW, updateEmployeePassword);
}

//----------------------------
//>>>start Employee Sagas (keyword prefix ECA)

export function* initEmployeeData(action) {
  try {
    const employees = yield call(callAuthGetJSON, EMPLOYEES_URL);
    yield put(ECA.setEmployeeData(transformEmployees2(employees)));
  } catch (e) {
    console.log(e);
  }
}

//export function* updateEmployeePassword(action) {
//  try {
//    const id = yield select(ECS.getEmployeeId);
//    const password = yield call(callAuthGetJSON, getPasswordAdminUrl(id));
//  } catch (e) {
//    console.log(e);
//  }
//}

export function* saveEmployeeRow(action) {
  try {
    const id = yield select(ECS.getEmployeeId);
    const data = yield select(ECS.getEmployeeRow);
    yield call(callAuthPostJSON,getUpdateEmployeeUrl(id), data);
    yield put(ECA.initEmployeeData());
  } catch (e) {
    console.log(e);
  }
  //let changePassword = yield select(ECS.getChangePassword);
  //if(changePassword){
  //  try{
  //    ; //set new password
  //  } catch(e){
  //    console.log(e);
  //  }
  //}
}

//----------------------------
//<<<end Employee Sagas

function* registerSaga(action) {
  const login = action.login;
  const password = action.password;

  const body = {
    username: login,
    password: password
  };

  try {
    const data = yield call(callRegisterPostJSON, REGISTER_URL, body);
    yield put(updateUserId(data.id));
    yield put(updateRole(data.sysRole));
    yield put(updateUserName(data.username));
    yield put(updateName(data.name));
    yield put(updateSurname(data.surname))

    yield call(history.push, '/profile')
    console.log(data)
  } catch (e) {
    console.log(e);
  }

}

function* loginSaga(action) {
  const login = action.login;
  const password = action.password;

  const body = {
    username: login,
    password: password
  };

  try {
    const data = yield call(callAuthPostJSON, LOGIN_URL, body);
    yield put(setAuth(data.token));
    const userId = yield call(callAuthGetJSON, ME_URL);
    const user = yield call(callAuthGetJSON, getUsersUrl(userId.id));
    yield put(setUser(user));
    yield call(history.push, '/meeting')
  } catch (e) {
    console.log(e);
  }
}

function* updateProfileSaga() {
  try {
    const username = yield select(PS.getUsername);
    const userId = yield select(PS.getUserId);
    const name = yield select(PS.getName);
    const surname = yield select(PS.getSurname);
    const role = yield select(PS.getRole);

    const url = EMPLOYEES_URL + "/" + userId.toString()

    console.log(url);

    yield call(callAuthPostJSON, url, transformUserProfileToJSON(username, name, surname, role));
    yield call(history.push, '/register')

  } catch (e) {
    alert("Problem with server. Try again later")
    console.log(e);
  }
}

export function* updateSpecializationSaga() {
  try {
    const ids = yield select(SS.getChosenBrands);
    const employeeId = yield select(SS.getEmployeeId);
    yield call(callAuthPostJSON, SPECIALIZATION_LIST_URL, transformUsersSpecializationsToJSON(ids.toJS(), employeeId));
  } catch (e) {
    console.log(e);
  }
}

export function* selectedSpecializationsSaga(action) {
  try {
    const specializations = yield call(callAuthGetJSON, SPECIALIZATION_URL);
    yield put(fillSpec(transformUsersSpecializations(specializations, action.value)));
  } catch (e) {
    console.log(e);
  }
}

export function* initOverViewSaga() {
  try {
    const allCustomers = yield call(callAuthGetJSON, CUSTOMERS_URL);
    const meetings = yield call(callAuthGetJSON, MEETING_URL);
    const brands = yield call(callAuthGetJSON, BRANDS_URL);
    const employees = yield call(callAuthGetJSON, EMPLOYEES_URL);

    yield put(updateOverviewData(transformToOverViewRows(meetings, employees, brands, allCustomers)));
  } catch (e) {
    console.log(e);
  }
}

export function* initSaga(action) {
  try {
    const allCustomers = yield call(callAuthGetJSON, CUSTOMERS_URL);
    console.log(allCustomers);
  } catch (e) {
    console.log(e);
  }
}

export function* meetingsSaga(action) {
  try {
    let userId = yield select(getLoggedUserId);
    userId = userId !== undefined ? userId : action.payload;
    const user = yield call(callAuthGetJSON, getUsersUrl(userId));
    yield put(setUser(user));
    const meetings = yield call(callAuthGetJSON, getUsersMeetingsUrl(userId));
    const customers = yield select(getMyCustomers);
    yield put(setMeetings(transformMeetings(meetings, customers)));
    yield put(setCustomers(transformCustomers(customers)));
  } catch (e) {
    console.log(e);
  }
}

export function* meetingSaga(action) {
  try {
    const row = yield select(getRow);
    const create = yield select(getCreateStatus);
    if (create) {
      yield call(callAuthPostJSON, MEETING_URL, row);
    } else {
      const id = yield select(getMeetingId);
      yield call(callAuthPostJSON, getUpdateMeetingUrl(id), row);
    }
    const userId = yield select(getLoggedUserId);
    yield put(initData(userId));
  } catch (e) {
    console.log(e);
  }
}

export function* initSpecializations(action) {
  try {
    const employees = yield call(callAuthGetJSON, EMPLOYEES_URL);
    const brands = yield call(callAuthGetJSON, BRANDS_URL);
    yield put(setSpecializationData(transformEmployees(employees), transformBrands(brands)));
  } catch (e) {
    console.log(e);
  }
}

export function* initConnectedEmployeeData(action) {
  try {
    const customers = yield call(callAuthGetJSON, CUSTOMERS_URL);
    const employees = yield call(callAuthGetJSON, EMPLOYEES_URL);
    const brands = yield call(callAuthGetJSON, BRANDS_URL);

    yield put(setEmployyesData(transformEmployees(employees)));
    yield put(setDataTable(transformConnectedEmployees(customers, brands, employees)));

  } catch (e) {
    console.log(e);
  }
}

export function* updateAssociatedEmployeeSaga(action) {
  try {

    const id = yield select(getCustomerId);
    const customer = yield select(getEditedCustomer);
    yield call(callAuthPostJSON, getUpdateCustomerUrl(id), customer);
    yield put(initConnectEmployeeData());

  } catch (e) {
    console.log(e);
  }
}

export function* deleteMeetingSaga() {
  try {
    const id = yield select(getMeetingId);
    yield call(callAuthDel, getUpdateMeetingUrl(id), {});

    const userId = yield select(getLoggedUserId);
    yield put(initData(userId));
  } catch (e) {
    console.log(e);
  }
}

export function* callAuthGetJSON(url) {
  const token = yield select(getAuthToken);
  const response = yield call(getUrl, url, token);
  return response;
}

export function* callAuthDel(url) {
  const token = yield select(getAuthToken);
  const response = yield call(delUrl, url, token);
  return response;
}

export function* callAuthPostJSON(url, data) {
  const token = yield select(getAuthToken);
  const response = yield call(postUrl, url, token, data);
  return response;
}

export function* callRegisterPostJSON(url, data) {
  return yield call(postRegisterUrl, url, data);

}

function getUrl(url, token) {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error) : resolve(res.body);
      });
  });
}

function postRegisterUrl(url, data) {
  return new Promise((resolve, reject) => {
    superagent
      .post(url)
      .set('Accept', 'application/json')
      .send(data)
      .end((error, res) => {
        error ? reject(error) : resolve(res.body);
      });
  });
}

function postUrl(url, token, data) {
  return new Promise((resolve, reject) => {
    superagent
      .post(url)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .send(data)
      .end((error, res) => {
        error ? reject(error) : resolve(res.body);
      });
  });
}

function delUrl(url, token, data) {
  return new Promise((resolve, reject) => {
    superagent
      .del(url)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .send(data)
      .end((error, res) => {
        error ? reject(error) : resolve(res.body);
      });
  });
}
