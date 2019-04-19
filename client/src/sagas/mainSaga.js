import {all, call, put, takeEvery, select} from "redux-saga/effects";
import {LOGIN} from "../actions/LoginActions";
import {REGISTER} from "../actions/RegisterActions";
import * as superagent from "superagent/dist/superagent";
import {getAuthToken} from "../selectors/AuthSelector";
import {getUsersUrl, LOGIN_URL, ME_URL, REGISTER_URL} from "../restapi/ServerApi";
import {setAuth, setUser} from "../actions/AuthActions";
import history from '../utils/history'
import {setAuth} from "../actions/AuthActions";

export default function* mainSaga () {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(REGISTER, registerSaga)
}

function* registerSaga(action) {
 const login = action.login ;
 const password = action.password;

  const body = {
    username: login,
    password: password
  };

  try{
    const data = yield call(callRegisterPostJSON, REGISTER_URL, body);
    // TODO: catch response
    // yield all([
    //   put(setAuth(data.)),
    // ]);
  }catch (e) {
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

  try{
    const data = yield call(callAuthPostJSON, LOGIN_URL, body);
    yield  put(setAuth(data.token));
    const userId  = yield call(callAuthGetJSON, ME_URL);
    const user = yield call(callAuthGetJSON, getUsersUrl(userId.id));
    yield  put(setUser(user));
    yield call(history.push, '/meeting')
  }catch (e) {
    console.log(e);
  }
}

export function* callAuthGetJSON(url) {
  const token = yield select(getAuthToken);
  const response = yield call(getUrl, url, token);
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
