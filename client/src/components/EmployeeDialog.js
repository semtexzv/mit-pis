import React from "react";
import {connect} from "react-redux";
import * as S from "../selectors/EmployeeSelector";
import * as A from "../actions/EmployeeActions";
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {Fieldset} from 'primereact/fieldset';
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import * as R from "../constants/Regex"
import * as snippet from "./smallSnippets"


const EmployeeDialog =
  ({
     displayDialog,
     dialogHeader,
     fieldsetLegend,
     deleteRow,
     saveRow,
     toggleDisplayDialog,
     addButton,
     unsetAddButton,
     name,
     surname,
     role,
     //passwordOld,
     passwordNew,
     passwordCheck,
     roleList,
     updateName,
     updateSurname,
     updateRole,
     changePassword,
     setChangePassword,
     unsetChangePassword,
     updatePasswordOld,
     passwordOld_fromBE,
     updatePasswordNew,
     updatePasswordCheck,
   }) => {

    //local variables
    var mygrowl; // use for error handling, contains Growl instance
    function setGrowl(el){
      // setting Growl instance to local variable
      if(el != null) {
        mygrowl = el;
      }
    }

    function fieldsetCollapsed(legend){
      if(legend === "Add password")
        return false;
      else
        return true;
    }

    function fieldsetToggleable(legend, changePassword){
      if(legend === "Add password")
        return false;
      else {
        return !changePassword;
      }
    }

    //---------------------------------------
    // JSX snippets
    function showDeleteButton(condition) {
      if(condition)
        return(<span> </span>);
      else
        return(
          <Button label="Delete" icon="pi pi-times"
            onClick={e => {deleteRow(); raiseGrowl("Data was deleted", mygrowl, "success");}}/>
        );
    }
    const dialogFooter =
      <div className="ui-dialog-buttonpane p-clearfix">
        {  /*it depends - don't show Delete Button if user adding new row*/
          showDeleteButton(addButton)
        }
        <Button label="Save" icon="pi pi-check"
                onClick={e => {saveButtonValidator(mygrowl)}}/>
      </div>;

    //---------------------------------------
    // Validations

    function passwordValidator(errorHandler){
      if(!changePassword) {
        if(fieldsetLegend !== "Add password")
          return true;
      }

      if((passwordNew !== "") && (passwordCheck !== "")){
        if(passwordNew === passwordCheck){
          return true;
        }
        else{
          raiseGrowl("The new password and its check do not match", errorHandler);
          updatePasswordNew("");
          updatePasswordCheck("");
          return false;
        }
      }
      else{
        raiseGrowl("The new password must not be empty string", errorHandler);
        updatePasswordNew("");
        updatePasswordCheck("");
        return false;
      }
    }

    function saveButtonValidator(errorHandler){
      if(R.name.test(name) && R.name.test(surname)){
        if(role !== "") {
          if(passwordValidator(errorHandler)) {
            saveRow();
            //updatePasswordOld("");
            updatePasswordNew("");
            updatePasswordCheck("");
            raiseGrowl("Data was edited", errorHandler, "success");
          }
        }
        else
          raiseGrowl("Please enter a role", errorHandler);
      }
      else
        raiseGrowl("Please enter name and surname", errorHandler);
    }

    //---------------------------------------
    // Return
    return(
      <div>
        <Growl ref={(el) => {setGrowl(el)}}> </Growl>
        <Dialog header="Employee data"  header={dialogHeader}
                visible={displayDialog} modal={true} footer={dialogFooter}
                onHide={() => {toggleDisplayDialog(); unsetChangePassword(); unsetAddButton()}}
        >
          <div>
            <InputText value={name} onChange={(e) => updateName(e.target.value)} placeholder="name"/>
            {snippet.required}
          </div>

          <div>
            <InputText value={surname} onChange={(e) => updateSurname(e.target.value)} placeholder="surname"/>
            {snippet.required}
          </div>

          <div>
            <Dropdown value={role} options={roleList.toJS()}
                      onChange={(e) => updateRole(e.value)} placeholder="Select a role"/>
            {snippet.required}
          </div>

          <div>
            <h3> </h3>
            <Fieldset legend={fieldsetLegend}
              toggleable={fieldsetToggleable(fieldsetLegend, changePassword)}
              collapsed={fieldsetCollapsed(fieldsetLegend)}
              onToggle={(e) => {setChangePassword()}}>
              <div>
                <Password value={passwordNew} placeholder="Type your new password here"
                  style={{width: "400px"}}
                  onChange={(e) => updatePasswordNew(e.target.value)}/>
              </div>

              <div>
                <Password value={passwordCheck} placeholder="Type your new password again"
                  style={{width: "400px"}}
                  onChange={(e) => updatePasswordCheck(e.target.value)}/>
              </div>
            </Fieldset>
          </div>

        </Dialog>
      </div>
    )
  };

const mapStateToProps = (state) => ({
  displayDialog: S.getDisplayDialog(state),
  dialogHeader: S.getDialogHeader(state),
  fieldsetLegend: S.getFieldsetLegend(state),
  addButton: S.getAddButton(state),
  name: S.getName(state),
  surname: S.getSurname(state),
  role: S.getRole(state),
  roleList: S.getRoleList(state),
  changePassword: S.getChangePassword(state),
  //passwordOld: S.getPasswordOld(state),
  //passwordOld_fromBE: S.getPasswordOld_fromBE(state),
  passwordNew: S.getPasswordNew(state),
  passwordCheck: S.getPasswordCheck(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: () => dispatch(A.deleteRow()),
  saveRow: () => dispatch(A.saveRow()),
  toggleDisplayDialog: () => dispatch(A.toggleDisplayDialog()),
  unsetAddButton: () => dispatch(A.unsetAddButton()),
  updateName: (value) => dispatch(A.updateName(value)),
  updateSurname: (value) => dispatch(A.updateSurname(value)),
  updateRole: (value) => dispatch(A.updateRole(value)),
  setChangePassword: () => dispatch(A.setChangePassword()),
  unsetChangePassword: () => dispatch(A.unsetChangePassword()),
  //updatePasswordOld: (value) => dispatch(A.updatePasswordOld(value)),
  updatePasswordNew: (value) => dispatch(A.updatePasswordNew(value)),
  updatePasswordCheck: (value) => dispatch(A.updatePasswordCheck(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDialog);
