import React from "react";
import {connect} from "react-redux";
import * as S from "../selectors/ConnectEmployeeSelector";
import * as A from "../actions/ConnectEmployeeActions";
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from "primereact/dropdown";
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import * as snippet from "./smallSnippets"

const ConnectEmployeeDialog =
({
  displayDialog,
  toggleDisplayDialog,
  customerName,
  customerSurname,
  customerBrand,
  potentialEmployee,
  employeeId,
  updateDropdown,
  saveRow,
}) => {

  //local variables
  var mygrowl; // use for error handling, contains Growl instance
  function setGrowl(el){
    // setting Growl instance to local variable
    if(el != null) {
      mygrowl = el;
    }
  }

  const dialogFooter =
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Confirm" icon="pi pi-check"
              onClick={e => {saveButtonValidator(employeeId, mygrowl)}}/>
    </div>;

  //---------------------------------------
  // Validations

  function checkDropDown(surname, errorHandler){
    if(surname.length === 0){
      raiseGrowl("You must choose some name", errorHandler);
      return false;
    }
    return true;
  }

  function saveButtonValidator(surname, errorHandler){
    // user must choose some name form list
    if(checkDropDown(surname, errorHandler)){
      raiseGrowl("Employee was assigned to customer", errorHandler, "success");
      saveRow();
    }
  }

  return(
    <div>
      <Growl ref={(el) => {setGrowl(el)}}> </Growl>
      <Dialog className="MeetingDialog" header="Employee assignment"
              visible={displayDialog} modal={true} footer={dialogFooter}
              onHide={() => toggleDisplayDialog()}
      >
        <div>
          <p>
            Customer <b>{customerName} {customerSurname}</b> with his favourite brand <b>{customerBrand}</b><br/>
            will be assigned to employee:
          </p>
        </div>

        <div>
          <Dropdown placeholder="Select an employee"
                    value={employeeId} options={potentialEmployee.toJS()}
                    onChange={(e) => {updateDropdown(e.value)}}
          />
          {snippet.required}
        </div>

      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  displayDialog: S.getDisplayDialog(state),
  customerName: S.getCustomerName(state),
  customerSurname: S.getCustomerSurname(state),
  customerBrand: S.getCustomerBrand(state),
  potentialEmployee: S.getPotentialEmployee(state),
  employeeId: S.getEmployeeId(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleDisplayDialog: () => dispatch(A.toggleDisplayDialog()),
  updateDropdown: (value) => dispatch(A.updateDropdown(value)),
  saveRow: () => dispatch(A.saveRow())
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectEmployeeDialog);
