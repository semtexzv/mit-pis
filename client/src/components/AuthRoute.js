import {getLastActiveTime, getLogged, getMyRole} from "../selectors/AuthSelector";
import React from 'react'
import {Redirect} from "react-router-dom";
import {setLasteouteTime} from "../actions/AuthActions";

export const AuthRoute = (store, allowedRoles, Component, action) => {

  const state = store.getState();

  const role = getMyRole(state);
  let loggedStatus = getLogged(state);
  const timeFromLastAction = getLastActiveTime(state);

  const n = new Date().getTime();

  if(n - timeFromLastAction > 600000){
    loggedStatus = false;
  }else{
    store.dispatch(setLasteouteTime(n));
    store.dispatch(action);
  }

  if(loggedStatus && allowedRoles.includes(role)){
    return (
      <Component/>
    )
  } else {
    return ( <Redirect to={{pathname: '/'}}/> )
      }
}
