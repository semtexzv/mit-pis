import {call, put, takeEvery, select, takeLatest} from "redux-saga/effects";
import {LOGIN} from "../actions/LoginActions";
import {REGISTER} from "../actions/RegisterActions";
import * as superagent from "superagent/dist/superagent";
import {getAuthToken, getLoggedUserId, getMyCustomers, getMyRole} from "../selectors/AuthSelector";
import {
  BRANDS_URL,
  MEETING_URL, CUSTOMERS_URL, EMPLOYEES_URL, getUpdateCustomerUrl, getUpdateMeetingUrl, getUsersMeetingsUrl, getUsersUrl, LOGIN_URL,
  ME_URL, REGISTER_URL, SPECIALIZATION_LIST_URL,
  SPECIALIZATION_URL,
  getUpdateEmployeeUrl, PASSWORD_CHANGE_URL, LOGOUT_URL,
} from "../restapi/ServerApi";
import {logout, LOGOUT_FROM_SERVER, setAuth, setUser} from "../actions/AuthActions";
import history from '../utils/history'
import {DELETE_ROW, INIT_DATA, initData, SAVE_ROW, setCustomers, setMeetings} from "../actions/MeetingActions";
import {
  transformBrands, transformConnectedEmployees, transformCustomers, transformCustomersToRows, transformEmployees, transformEmployees2, transformMeetings,
  transformToOverViewRows,
  transformUsersSpecializations,
  transformUsersSpecializationsToJSON
} from "../utils/transformUtils";
import {getCreateStatus, getMeetingId, getRow} from "../selectors/MeetingSelector";
import {fillSpec, INIT_SPECIALIZATION_DATA, SAVE_SPEC, setSpecializationData, UPDATE_DROPDOWN} from "../actions/SpecializationActions";
import {INIT_CONNECT_EMPLOYEE_DATA, initConnectEmployeeData, setDataTable, setEmployyesData} from "../actions/ConnectEmployeeActions";

import * as CEA from "../actions/ConnectEmployeeActions";
import * as CA from "../actions/CustomerActions";
import {getCustomerId, getEditedCustomer} from "../selectors/ConnectEmployeeSelector";
import * as SS from "../selectors/SpecializationSelector";
import * as PS from "../selectors/ProfileSelector"
import * as CS from "../selectors/CustomerSelector";
import {INIT_OVERVIEW, updateOverviewData} from "../actions/OverviewActions";
import {INIT_CUSTOMER_DATA} from "../actions/CustomerActions";
import {getCustomer, getCustomerCreated} from "../selectors/CustomerSelector";
import {initCustomerData} from "../actions/CustomerActions";
import {initProfile, NOTHING, SAVE_PROFILE, updateName, updateSurname, updateUserId, updateUserName} from "../actions/ProfileActions";

// EmployeeContainer
import * as ECA from "../actions/EmployeeActions"
import * as ECS from "../selectors/EmployeeSelector"
import {getEmployeeCreateStatus} from "../selectors/EmployeeSelector";
import {getProfileUserId} from "../selectors/ProfileSelector";
import {getProfileUpdated} from "../selectors/ProfileSelector";

export default function* mainSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(REGISTER, registerSaga);
  yield takeEvery(SAVE_ROW, meetingSaga);
  yield takeEvery(DELETE_ROW, deleteMeetingSaga);
  yield takeEvery(CA.DELETE_ROW, deleteCustomerSaga);
  yield takeLatest(INIT_SPECIALIZATION_DATA, initSpecializations);
  yield takeLatest(INIT_CONNECT_EMPLOYEE_DATA, initConnectedEmployeeData);
  yield takeLatest(INIT_DATA, meetingsSaga);
  yield takeLatest(UPDATE_DROPDOWN, selectedSpecializationsSaga);
  yield takeEvery(CEA.SAVE_ROW, updateAssociatedEmployeeSaga);
  yield takeEvery(CA.SAVE_ROW, customerSaga);
  yield takeEvery(SAVE_SPEC, updateSpecializationSaga);
  yield takeLatest(INIT_OVERVIEW, initOverViewSaga);
  yield takeLatest(INIT_CUSTOMER_DATA, initCustomerDataSaga);
  yield takeEvery(LOGOUT_FROM_SERVER, logoutSaga);
  yield takeLatest(NOTHING, initProfileSaga);
  yield takeLatest(SAVE_PROFILE, saveProfileSaga);
  yield takeEvery(ECA.DELETE_ROW, deleteEmployeeSaga);
  // EmployeeContainer
  yield takeLatest(ECA.INIT_EMPLOYEE_DATA, initEmployeeData);
  yield takeEvery(ECA.SAVE_ROW, newEmployeeSaga);
  //yield takeEvery(ECA.UPDATE_SELECTED_ROW, updateEmployeePassword);
}

export function* newEmployeeSaga(action){
  try {

    const create = yield select(getEmployeeCreateStatus);
    const newEmployee = yield select(ECS.getCompleteEmployee);

    if (create) {
      const body = {
        username: newEmployee.username,
        password: newEmployee.password
      };
      const employee = yield call(callRegisterPostJSON, REGISTER_URL, body);
      yield call(callAuthPostJSON, getUpdateEmployeeUrl(employee.id), newEmployee);
    } else {
      const id = yield select(ECS.getEmployeeId);
      yield call(callAuthPostJSON, getUpdateEmployeeUrl(id), newEmployee);
      const changedPassword = yield select(ECS.getChangePassword);
      if(changedPassword){
        const body = {
          password: newEmployee.password,
          userId: id
        }
        yield call(callAuthPostJSON, PASSWORD_CHANGE_URL, body);
      }
    }

    yield put(ECA.initEmployeeData());

  } catch (e) {
    console.log(e);
  }
}

export function* deleteEmployeeSaga(){
  try {
    const id = yield select(ECS.getEmployeeId);
    yield call(callAuthDel, getUpdateEmployeeUrl(id), {});
    yield put(ECA.initEmployeeData());
  } catch (e) {
    console.log(e);
  }
}

//----------------------------
//>>>start Employee Sagas (keyword prefix ECA)

export function* initEmployeeData(action) {
  try {
    const userId = yield call(callAuthGetJSON, ME_URL);
    const employees = yield call(callAuthGetJSON, EMPLOYEES_URL);
    yield put(ECA.setEmployeeData(transformEmployees2(employees, userId.id)));
  } catch (e) {
    console.log(e);
  }
}

export function* initProfileSaga(action) {
  try {
    const userId = yield call(callAuthGetJSON, ME_URL);
    const user = yield call(callAuthGetJSON, getUsersUrl(userId.id));
    yield put(initProfile(user));
  } catch (e) {
    console.log(e);
  }
}

export function* saveProfileSaga() {
  try {
    const userId = yield select(getProfileUserId);
    const employee = yield select(getProfileUpdated);
    const user = yield call(callAuthPostJSON, getUsersUrl(userId), employee);

    const changedPassword = yield select(PS.getChangePassword);
    console.log(changedPassword);
    if(changedPassword){
      const body = {
        password: employee.password,
        userId: userId
      };
      yield call(callAuthPostJSON, PASSWORD_CHANGE_URL, body);
    }

    yield put(initProfile(user));

  } catch (e) {
    console.log(e);
  }
}

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
    //yield put(updateRole(data.sysRole));
    yield put(updateUserName(data.username));
    yield put(updateName(data.name));
    yield put(updateSurname(data.surname))

    //console.log(data)
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

export function* initCustomerDataSaga(action) {
  try {
    const allCustomers = yield call(callAuthGetJSON, CUSTOMERS_URL);
    const brands = yield call(callAuthGetJSON, BRANDS_URL);
    const userId = yield select(getLoggedUserId);
    const role = yield select(getMyRole);
    yield put(CA.setCustomers(transformCustomersToRows(allCustomers, brands, userId, role)));
  } catch (e) {
    console.log(e);
  }
}

export function* customerSaga(action) {
  try {
    const userId = yield select(getLoggedUserId);
    const customer = yield select(getCustomer);
    const brands = yield call(callAuthGetJSON, BRANDS_URL);

    let brand = brands.find(o => o.name === customer.brandId);

    if(typeof brand !== 'undefined'){
      customer.brandId = brand.id;
    }else{
      brand = yield call(callAuthPostJSON, BRANDS_URL, {name: customer.brandId});
      customer.brandId = brand.id;
    }

    customer.assocEmployeeId = userId;

    const create = yield select(getCustomerCreated);
    if(create){
      yield call(callAuthPostJSON,CUSTOMERS_URL, customer);
    }else{
      const id = yield select(CS.getCustomerId);
      yield call(callAuthPostJSON,getUpdateCustomerUrl(id), customer);
    }

    yield put(initCustomerData());

  } catch (e) {
    console.log(e);
  }
}

export function* deleteCustomerSaga(){
  try {
    const id = yield select(CS.getCustomerId);
    yield call(callAuthDel,getUpdateCustomerUrl(id), {});
    yield put(initCustomerData());
  } catch (e) {
    console.log(e);
  }
}

export function* logoutSaga(action) {
  try {
    const token = yield select(getAuthToken);
    if(token !== ""){
      yield call(callAuthGetJSON, LOGOUT_URL);
    }
    yield put(logout());
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
    const brands = yield call(callAuthGetJSON, BRANDS_URL);
    yield put(setMeetings(transformMeetings(meetings, customers, brands)));
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
