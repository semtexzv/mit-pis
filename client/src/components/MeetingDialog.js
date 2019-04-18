import React from "react";
import {connect} from "react-redux";
import * as S from "../selectors/MeetingSelector";
import * as A from "../actions/MeetingActions";
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from "primereact/dropdown";
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import {Calendar} from 'primereact/calendar';
import {convert_FE_date, convert_ISO_date, todayDate} from "../utils/dateTimeConvert"
import "../styles/MeetingDialog.css"


const MeetingDialog =
({
   allCustomers,
   date,
   name,
   surname,
   title,
   brand,
   customerInfo,
   meetingInfo,
   displayDialog,
   addButton,
   deleteRow,
   saveRow,
   unsetAddButton,
   toggleDisplayDialog,
   updateDate,
   updateName,
   updateSurname,
   updateTitle,
   updateBrand,
   updateCustomerInfo,
   updateMeetingInfo
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
  function showDeleteButton(condition) {
    if(condition)
      return(<span> </span>);
    else
      return(
        <Button label="Delete" icon="pi pi-times" onClick={e => deleteRow()}/>
      );
  }
  const dialogFooter =
    <div className="ui-dialog-buttonpane p-clearfix">
      {  /*it depends - don't show Delete Button if user adding new row*/
        showDeleteButton(addButton)
      }
      <Button label="Save" icon="pi pi-check"
        onClick={e => {saveButtonValidator(surname, mygrowl)}}/>
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
      saveRow();
    }
  }

  //---------------------------------------
  // Return
  return(
    <div>
      <Growl ref={(el) => {setGrowl(el)}}> </Growl>
      <Dialog className="MeetingDialog" header="Add meeting"
        visible={displayDialog} modal={true} footer={dialogFooter} onHide={() => {toggleDisplayDialog(); unsetAddButton();}}
      >
        <div>
        <Dropdown placeholder="Select a name"
                  value={name.concat(" ", surname)} options={allCustomers.toJS()}
                  onChange={(e) => {let arr = e.value.split(" "); updateName(arr[0]); updateSurname(arr[1])}}
        />
        </div>

        <div>
        <InputText placeholder="Title" onChange={(e) => updateTitle(e.target.value)} value={title}/>
        </div>

        <div>
        <InputText placeholder="Brand" onChange={(e) => updateBrand(e.target.value)} value={brand}/>
        </div>

        <div>
        <InputTextarea rows={5} cols={50} placeholder="Info about customer" onChange={(e) => updateCustomerInfo(e.target.value)} value={customerInfo}/>
        </div>

        <div>
        <InputTextarea rows={5} cols={50} placeholder="Info about meeting" onChange={(e) => updateMeetingInfo(e.target.value)} value={meetingInfo}/>
        </div>

        <div className="p-col-12 p-md-4">
          <Calendar placeholder="Date"
                    value={convert_ISO_date(date)}
                    onChange={(e) => updateDate(convert_FE_date(e.target.value))}
                    readOnlyInput={true} showTime={true} className="Calendar" hideOnDateTimeSelect={true}
                    stepMinute={15} dateFormat={"mm/dd/y"} viewDate={todayDate()}
          />
        </div>

      </Dialog>
    </div>
  )
};

const mapStateToProps = (state) => ({
  allCustomers: S.getAllCustomers(state),
  displayDialog: S.getDisplayDialog(state),
  addButton: S.getAddButton(state),
  date: S.getDate(state),
  name: S.getName(state),
  surname: S.getSurname(state),
  title: S.getTitle(state),
  brand: S.getBrand(state),
  customerInfo: S.getCustomerInfo(state),
  meetingInfo: S.getMeetingInfo(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: () => dispatch(A.deleteRow()),
  saveRow: () => dispatch(A.saveRow()),
  toggleDisplayDialog: () => dispatch(A.toggleDisplayDialog()),
  unsetAddButton: () => dispatch(A.unsetAddButton()),
  updateDate: (value) => dispatch(A.updateDate(value)),
  updateName: (value) => dispatch(A.updateName(value)),
  updateSurname: (value) => dispatch(A.updateSurname(value)),
  updateTitle: (value) => dispatch(A.updateTitle(value)),
  updateBrand: (value) => dispatch(A.updateBrand(value)),
  updateCustomerInfo: (value) => dispatch(A.updateCustomerInfo(value)),
  updateMeetingInfo: (value) => dispatch(A.updateMeetingInfo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDialog);
