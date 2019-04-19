import {all, call, put, takeEvery, select} from "redux-saga/effects";
import {LOGIN} from "../actions/LoginActions";
import * as superagent from "superagent/dist/superagent";
import {getAuthToken} from "../selectors/AuthSelector";
import {LOGIN_URL} from "../restapi/ServerApi";
import {setAuth} from "../actions/AuthActions";
import history from '../utils/history'


export default function* mainSaga () {
  yield takeEvery(LOGIN, loginSaga);
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
    yield all([
      put(setAuth(data.token)),
      call(history.push, '/meeting')
    ]);
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
