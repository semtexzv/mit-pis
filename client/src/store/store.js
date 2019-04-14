import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {rootReducer} from "../reducers";
import mainSaga from "../sagas/mainSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMidddleware = createSagaMiddleware();

export default function configureStore() {

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMidddleware)),
  );

  sagaMidddleware.run(mainSaga);

  return store;
}
