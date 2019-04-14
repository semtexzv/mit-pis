import {all, call, put, takeEvery} from "redux-saga/effects";
import {LOGIN} from "../actions/LoginActions";


export default function* () {
  takeEvery(LOGIN, loginSaga);
}

function* loginSaga(action) {
  const login = action.login;
  const password = action.password;

  try{
    yield put();
  } finally {

  }
}
