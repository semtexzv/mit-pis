import React, {Component} from "react";
import {connect} from "react-redux";
import * as S from "../selectors/MeetingSelector";
import * as A from "../actions/MeetingActions";
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from "primereact/dropdown";
import {Button} from 'primereact/button';

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
   deleteRow,
   saveRow,
   toggleDisplayDialog,
   updateDate,
   updateName,
   updateSurname,
   updateTitle,
   updateBrand,
   updateCustomerInfo,
   updateMeetingInfo
}) => {

  const dialogFooter =
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={e => deleteRow()} />
      <Button label="Save" icon="pi pi-check" onClick={e => saveRow()}/>
    </div>;

  return(
    <Dialog
      visible={displayDialog} modal={true} footer={dialogFooter} onHide={() => toggleDisplayDialog()}
      style={{width: '50vw'}}
    >
      <InputText id="date" onChange={(e) => updateDate(e.target.value)} value={date}/>
      <Dropdown placeholder="Select a name"
                value={name.concat(" ", surname)} options={allCustomers.toJS()}
                onChange={(e) => {let arr = e.value.split(" "); updateName(arr[0]); updateSurname(arr[1])}}
      />
      <InputText id="title" onChange={(e) => updateTitle(e.target.value)} value={title}/>
      <InputText id="brand" onChange={(e) => updateBrand(e.target.value)} value={brand}/>
      <InputTextarea id="customerInfo" onChange={(e) => updateCustomerInfo(e.target.value)} value={customerInfo}/>
      <InputTextarea id="meetingInfo" onChange={(e) => updateMeetingInfo(e.target.value)} value={meetingInfo}/>
    </Dialog>
  )
};

const mapStateToProps = (state) => ({
  allCustomers: S.getAllCustomers(state),
  displayDialog: S.getDisplayDialog(state),
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
  updateDate: (value) => dispatch(A.updateDate(value)),
  updateName: (value) => dispatch(A.updateName(value)),
  updateSurname: (value) => dispatch(A.updateSurname(value)),
  updateTitle: (value) => dispatch(A.updateTitle(value)),
  updateBrand: (value) => dispatch(A.updateBrand(value)),
  updateCustomerInfo: (value) => dispatch(A.updateCustomerInfo(value)),
  updateMeetingInfo: (value) => dispatch(A.updateMeetingInfo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDialog);
