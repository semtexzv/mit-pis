import {getLogged, getMyRole} from "../selectors/AuthSelector";
import React from 'react'
import {Redirect} from "react-router-dom";

export const AuthRoute = (store, allowedRoles, Component, action) => {

  const state = store.getState();

  const role = getMyRole(state);
  const loggedStatus = getLogged(state);

  store.dispatch(action);

  if(loggedStatus){
    return (
      <Component/>
    )
  } else {
    return ( <Redirect to={{pathname: '/'}}/> )
      }
}
