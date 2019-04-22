import React from "react";
import {connect} from "react-redux";
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {getLogin, getPassword} from "../selectors/LoginSelector";
import {logToSystem, updateLogin, updatePassword} from "../actions/LoginActions";
import "../styles/Login.css"

const Login = ({
  loginValue,
  passwordValue,
  updateLogin,
  updatePassword,
  login
}) => {
  return (
    <div className="Login">
      <div>
        <h3 className="first">Username</h3>
        <InputText value={loginValue} onChange={(e) => updateLogin(e.target.value)} />
        <h3 className="first">Password</h3>
        <InputText value={passwordValue} onChange={(e) => updatePassword(e.target.value)} type="password" />
        <div className="Login-Button">
          <Button label="Login" onClick={e => login(loginValue,passwordValue)}/>
        </div>
      </div>
  </div>);
};

const mapStateToProps = (state) => ({
  loginValue: getLogin(state),
  passwordValue: getPassword(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateLogin: (value) => dispatch(updateLogin(value)),
  updatePassword: (value) => dispatch(updatePassword(value)),
  login: (loginValue, passwordValue) => dispatch(logToSystem(loginValue, passwordValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
