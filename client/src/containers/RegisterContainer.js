import React from "react";
import {connect} from "react-redux";
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {getLogin, getPassword} from "../selectors/RegisterSelector";
import {registerToSystem, updateLogin, updatePassword} from "../actions/RegisterActions";
import "../styles/Register.css"

const Register = ({
                    loginValue,
                    passwordValue,
                    updateLogin,
                    updatePassword,
                    register
                  }) => {
  return (
    <div className="Register">
      <div>
        <h3 className="first">Username</h3>
        <InputText value={loginValue} onChange={(e) => updateLogin(e.target.value)}/>
        <h3 className="first">Password</h3>
        <Password value={passwordValue} onChange={(e) => updatePassword(e.target.value)}/>
        <div className="Register-Button">
          <Button label="Register" onClick={e => register(loginValue, passwordValue)}/>
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
  register: (loginValue, passwordValue) => dispatch(registerToSystem(loginValue, passwordValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
