import React from 'react'
import {logoutFromServer} from "../actions/AuthActions";
import LoginContainer from "../containers/LoginContainer";

export const Logout = (store) => {
    store.dispatch(logoutFromServer());
    return <LoginContainer/>;
};
