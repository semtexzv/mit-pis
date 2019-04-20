import React from "react";
import {connect} from "react-redux";
import * as S from "../selectors/EmployeeSelector";
import * as A from "../actions/EmployeeActions";
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import * as R from "../constants/Regex"


const EmployeeDialog =
  ({
     displayDialog,
     deleteRow,
     saveRow,
     toggleDisplayDialog,
     name,
     surname,
     role,
     passwordOld,
     passwordNew,
     passwordCheck,
     roleList,
     updateName,
     updateSurname,
     updateRole,
     updatePasswordOld,
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

    //---------------------------------------
    // JSX snippets
    const dialogFooter =
      <div className="ui-dialog-buttonpane p-clearfix">
        <Button label="Delete" icon="pi pi-times"
                onClick={e => {deleteRow(); raiseGrowl("Data was deleted", mygrowl, "success")}}/>
        <Button label="Save" icon="pi pi-check"
                onClick={e => saveButtonValidator(mygrowl)}/>
      </div>;

    //---------------------------------------
    // Validations

    function saveButtonValidator(errorHandler){
      //TODO: add password validation
      //TODO: what if old password is wrong
      if(R.name.test(name) && R.name.test(surname)){
        if(role !== "") {
          saveRow();
          raiseGrowl("Data was edited", errorHandler, "success");
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
        <Dialog header="Employee data"
                visible={displayDialog} modal={true} footer={dialogFooter}
                onHide={() => toggleDisplayDialog()}
        >
          <div>
            <InputText value={name} onChange={(e) => updateName(e.target.value)} placeholder="name"/>
          </div>

          <div>
            <InputText value={surname} onChange={(e) => updateSurname(e.target.value)} placeholder="surname"/>
          </div>

          <div>
            <Dropdown value={role} options={roleList.toJS()}
                      onChange={(e) => updateRole(e.value)} placeholder="Select a role"/>
          </div>

          <div>
            <InputText value={passwordOld} placeholder="Type your old password here if you want to change it"
              style={{width: "400px"}}
              onChange={(e) => updatePasswordOld(e.target.value)} type="password" />
          </div>

          <div>
            <InputText value={passwordNew} placeholder="Type your new password here if you want to change it"
              style={{width: "400px"}}
              onChange={(e) => updatePasswordNew(e.target.value)} type="password" />
          </div>

          <div>
            <InputText value={passwordCheck} placeholder="Type your new password again"
              style={{width: "400px"}}
              onChange={(e) => updatePasswordCheck(e.target.value)} type="password" />
          </div>

        </Dialog>
      </div>
    )
  };

const mapStateToProps = (state) => ({
  displayDialog: S.getDisplayDialog(state),
  name: S.getName(state),
  surname: S.getSurname(state),
  role: S.getRole(state),
  roleList: S.getRoleList(state),
  passwordOld: S.getPasswordOld(state),
  passwordNew: S.getPasswordNew(state),
  passwordCheck: S.getPasswordCheck(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: () => dispatch(A.deleteRow()),
  saveRow: () => dispatch(A.saveRow()),
  toggleDisplayDialog: () => dispatch(A.toggleDisplayDialog()),
  updateName: (value) => dispatch(A.updateName(value)),
  updateSurname: (value) => dispatch(A.updateSurname(value)),
  updateRole: (value) => dispatch(A.updateRole(value)),
  updatePasswordOld: (value) => dispatch(A.updatePasswordOld(value)),
  updatePasswordNew: (value) => dispatch(A.updatePasswordNew(value)),
  updatePasswordCheck: (value) => dispatch(A.updatePasswordCheck(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDialog);
