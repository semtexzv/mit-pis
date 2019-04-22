import React from "react";
import {connect} from "react-redux";
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {getName, getSurname, getRole, getRoleList} from "../selectors/ProfileSelector";
import {updateName, updateSurname, updateRole, saveProfile} from "../actions/ProfileActions";
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import * as R from "../constants/Regex"
import * as snippet from "../components/smallSnippets"

const Profile =
({
  name,
  surname,
  role,
  roleList,
  updateName,
  updateSurname,
  updateRole,
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

  function saveButtonValidator(errorHandler){
    if(R.name.test(name) && R.name.test(surname)){
      if(role !== "")
        saveProfile();
      else
        raiseGrowl("Please enter a role", errorHandler);
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
        <Dropdown value={role} options={roleList.toJS()}
          onChange={(e) => updateRole(e.value)} placeholder="Select a role"/>
        {snippet.required}
      </div>
      <div className="Login-Button">
        <h3> </h3>
        <Button label="Save" onClick={e => saveButtonValidator(mygrowl)}/>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  name: getName(state),
  surname: getSurname(state),
  role: getRole(state),
  roleList: getRoleList(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateName: (value) => dispatch(updateName(value)),
  updateSurname: (value) => dispatch(updateSurname(value)),
  updateRole: (value) => dispatch(updateRole(value)),
  saveProfile: () => dispatch(saveProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
