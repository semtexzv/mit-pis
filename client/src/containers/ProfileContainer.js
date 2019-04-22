import React from "react";
import {connect} from "react-redux";
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Fieldset} from 'primereact/fieldset';
import {Button} from 'primereact/button';
import * as S from "../selectors/ProfileSelector";
import * as A from "../actions/ProfileActions";
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import * as R from "../constants/Regex"
import * as snippet from "../components/smallSnippets"

const Profile =
({
  name,
  surname,
  userName,
  passwordNew,
  passwordCheck,
  changePassword,
  updateName,
  updateSurname,
  updateUserName,
  updatePasswordNew,
  updatePasswordCheck,
  setChangePassword,
  unsetChangePassword,
  saveProfile
}) => {

  //local variables
  var mygrowl; // use for error handling, contains Growl instance
  function setGrowl(el) {
    // setting Growl instance to local variable
    if (el != null) {
      mygrowl = el;
    }
  }

  //---------------------------------------
  // Validations

  function passwordValidations(errorHandler){
    if(!changePassword){
      return true;
    }
    if(passwordNew !== ""){
      if(passwordNew === passwordCheck){
        return true;
      }
      else
        raiseGrowl("The new password and its check do not match", errorHandler);
    }
    else
      raiseGrowl("Please enter new password", errorHandler);
  }

  function saveButtonValidator(errorHandler){
    if(R.name.test(name) && R.name.test(surname)){
      if(userName !== "") {
        //TODO: more password validations
        if(passwordValidations(errorHandler)) {
          saveProfile();
          unsetChangePassword();
          updatePasswordNew("");
          updatePasswordCheck("");
          raiseGrowl("Data was updated", errorHandler, "success");
        }
      }
      else {
        raiseGrowl("Please enter login username", errorHandler);
      }
    }
    else
      raiseGrowl("Please enter name and surname", errorHandler);
  }

  return(
    <div>
      <Growl ref={(el) => {setGrowl(el)}}> </Growl>
      <div>
        <h3> </h3>
        <InputText value={name} onChange={(e) => updateName(e.target.value)} placeholder="Name"/>
        {snippet.required}
      </div>
      <div>
        <h3> </h3>
        <InputText value={surname} onChange={(e) => updateSurname(e.target.value)} placeholder="Surname"/>
        {snippet.required}
      </div>
      <div>
        <h3> </h3>
        <InputText value={userName} onChange={(e) => updateUserName(e.target.value)} placeholder="Login username"/>
        {snippet.required}
      </div>
      <div>
        <h3> </h3>
        <Fieldset legend="Change password" toggleable={!changePassword} collapsed={true}
                  onToggle={(e) => {setChangePassword()}}>
          <div>
            <h3> </h3>
            <Password value={passwordNew} onChange={(e) => updatePasswordNew(e.target.value)}
              placeholder="Type new password here"/>
            {snippet.required}
          </div>
          <div>
            <h3> </h3>
            <Password value={passwordCheck} onChange={(e) => updatePasswordCheck(e.target.value)}
                       placeholder="Type new password again"/>
            {snippet.required}
          </div>
        </Fieldset>
      </div>
      <div className="Login-Button">
        <h3> </h3>
        <Button label="Save" onClick={e => saveButtonValidator(mygrowl)}/>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  name: S.getName(state),
  surname: S.getSurname(state),
  userName: S.getUsername(state),
  passwordNew: S.getPasswordNew(state),
  passwordCheck: S.getPasswordCheck(state),
  changePassword: S.getChangePassword(state),
  userId: S.getUserId(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateName: (value) => dispatch(A.updateName(value)),
  updateSurname: (value) => dispatch(A.updateSurname(value)),
  updateUserName: (value) => dispatch(A.updateUserName(value)),
  updatePasswordNew: (value) => dispatch(A.updatePasswordNew(value)),
  updatePasswordCheck: (value) => dispatch(A.updatePasswordCheck(value)),
  setChangePassword: () => dispatch(A.setChangePassword()),
  unsetChangePassword: () => dispatch(A.unsetChangePassword()),
  saveProfile: () => dispatch(A.saveProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
