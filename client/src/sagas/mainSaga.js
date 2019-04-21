import {call, put, takeEvery, select, takeLatest} from "redux-saga/effects";
import {LOGIN} from "../actions/LoginActions";
import {REGISTER} from "../actions/RegisterActions";
import * as superagent from "superagent/dist/superagent";
import {getAuthToken, getLoggedUserId, getMyCustomers} from "../selectors/AuthSelector";
import {
  BRANDS_URL,
  CREATE_MEETING_URL, CUSTOMERS_URL, EMPLOYEES_URL, getUpdateMeetingUrl, getUsersMeetingsUrl, getUsersUrl, LOGIN_URL, ME_URL, REGISTER_URL
} from "../restapi/ServerApi";
import {setAuth, setUser} from "../actions/AuthActions";
import history from '../utils/history'
import { DELETE_ROW, INIT_DATA, initData, SAVE_ROW, setCustomers, setMeetings} from "../actions/MeetingActions";
import {transformBrands, transformCustomers, transformEmployees, transformMeetings} from "../utils/transformUtils";
import {getCreateStatus, getMeetingId, getRow} from "../selectors/MeetingSelector";
import {INIT_SPECIALIZATION_DATA, setSpecializationData} from "../actions/SpecializationActions";
import {INIT_CONNECT_EMPLOYEE_DATA} from "../actions/ConnectEmployeeActions";

export default function* mainSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(REGISTER, registerSaga);
  yield takeEvery(SAVE_ROW, meetingSaga);
  yield takeEvery(REGISTER, registerSaga);
  yield takeEvery(DELETE_ROW, deleteMeetingSaga);
  yield takeLatest(INIT_SPECIALIZATION_DATA, initSpecializations);
  yield takeLatest(INIT_CONNECT_EMPLOYEE_DATA, initConnectedEmployeeData);
  yield takeLatest(INIT_DATA, meetingsSaga);
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
    yield put(initData(userId.id));
    yield call(history.push, '/meeting')
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
    const meetings = yield call(callAuthGetJSON, getUsersMeetingsUrl(action.payload));
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
    if(create){
      yield call(callAuthPostJSON,CREATE_MEETING_URL, row);
    }else{
      const id = yield select(getMeetingId);
      yield call(callAuthPostJSON,getUpdateMeetingUrl(id), row);
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
  } catch (e) {
    console.log(e);
  }
}


export function* deleteMeetingSaga(){
  try {
    const id = yield select(getMeetingId);
    yield call(callAuthDel,getUpdateMeetingUrl(id), {});

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
